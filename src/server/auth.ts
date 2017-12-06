import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { Express, Request, Response } from "express-serve-static-core";
import * as passport from 'passport';
import { Strategy as AmazonStrategy } from 'passport-amazon';
import { Strategy as LocalStrategy } from 'passport-local';
import { AMAZON_CLIENT_ID, AMAZON_CLIENT_SECRET } from '../config/config';
import { DaoFactory } from '../data/dao-factory';
import { User } from '../model/user';
import { compare } from '../util/password-util';


const deserializeUser = (
  obj: object,
  done: (err: Error, user: object) => void
): void => {
  done(null, obj);
};

const serializeUser = (
  user: object, 
  done: (err: Error, user: object) =>  void
): void => {
  done(null, user);
};

/**
 * middleware to determine if user is logged in. Just passes through if user is
 * authenticated, otherwise redirects to the login page
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export const isLoggedIn =(
  req: Request, 
  res: Response, 
  next: (err?: Error) => void
): void => {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};



export const configureAuthentication = (app: Express): void => {

  // configure app for authenticated sessions

  app.use(cookieParser());
  app.use(bodyParser());
  app.use(session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());


  // configure user seralization
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  // configure authentication strategy for amazon
  passport.use(new AmazonStrategy({
      clientID: AMAZON_CLIENT_ID,
      clientSecret: AMAZON_CLIENT_SECRET,
      callbackURL: "http://localhost:9001/auth/amazon/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  ));

  app.get('/auth/amazon', passport.authenticate('amazon', { 
    scope: ['profile', 'postal_code'] 
  }));

  app.get('/auth/amazon/callback', 
  passport.authenticate('amazon', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });


  // configure username and password authentiction strategy
  passport.use(
    new LocalStrategy(async (
      username: string,  password: string,  done: any 
    ) => {
      const userDao = DaoFactory.getDao(User);
      const user = (await userDao.find({ username })) as User;

      if(!user) { 
        return done(null, false, { message: 'user not found' }); 
      }

      const matchPassword = await compare(password, user.hashedPassword);
      if(!matchPassword) {
        return done(null, false, { message: 'invalid passsword' });
      }

      return done(null, { username: user.username });
    })
  );

  app.post('/login', bodyParser.json(), (
      req: Request, 
      res: Response, 
      next: (err?: Error) => void
    ) => {
    passport.authenticate('local', (
      err: Error, 
      user: object | boolean, 
      info: { message: string }
    ) => {
      if(err) { return next(err); }
      if(!user) { return res.sendStatus(401); }
      req.logIn(user, (err: Error) => {
        if(err) { return next(err); }
        return res.sendStatus(200);
      });
    })(req, res, next);
  });


  app.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    res.redirect('/login');
  });

};

