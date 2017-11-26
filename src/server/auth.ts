import * as session from 'express-session';
import { Express, Request, Response } from "express-serve-static-core";
import * as passport from 'passport';
import { Strategy as AmazonStrategy } from 'passport-amazon';
import { AMAZON_CLIENT_ID, AMAZON_CLIENT_SECRET } from '../config/config';


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
}

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
    console.log('request is authenticted!');
    return next();
  }
  res.redirect('/login');
}

export const configureAuthentication = (app: Express): void => {

  // configure app for authenticated sessions
  app.use(session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());


  // configure user seralization
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  console.log('configure authentication ran2');
  console.log(AMAZON_CLIENT_ID);

  // configure authentication strategy for amazon
  passport.use(new AmazonStrategy({
      clientID: AMAZON_CLIENT_ID,
      clientSecret: AMAZON_CLIENT_SECRET,
      callbackURL: "http://localhost:9001/auth/amazon/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      console.log('received user');
      console.log(profile);
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

};
