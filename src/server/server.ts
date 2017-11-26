import 'babel-polyfill';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Express, Request, Response } from "express-serve-static-core";
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import * as path from 'path';
import { configureAuthentication, isLoggedIn } from './auth';
import { addWebpackHMR } from './webpack-hmr';
import { SERVER_PORT } from '../config/config';
import schema from './graphql/executable-schema';

const app: Express = express();

addWebpackHMR(app);
configureAuthentication(app);


// setup routes for static content
const staticRoutes: string[] = [
  '/images/*.jpg',
  '/images/*.jpg',
  '/style.css'
];
const authenticatedStaticRoutes: string[] = [
  '/',
  '/bundle.js'
];
const DOCBASE = path.join(__dirname, '..', '..', 'docbase');
app.get(staticRoutes, express.static(DOCBASE));
app.get(authenticatedStaticRoutes, isLoggedIn, express.static(DOCBASE));

// redirect from .html routes
app.get('/index.html', (req: Request, res: Response) => {
  res.redirect('/');
});
app.get('/login.html', (req: Request, res: Response) => {
  res.redirect('/login');
});


// routs for login page
const loginRoutes: string[] = [
  '/create-account',
  '/login'
]
app.get(loginRoutes, (req: Request, res: Response) => {
  res.sendFile(path.join(DOCBASE, 'login.html'));
});


app.get('/test', (req, res) => {
  res.set('Content-type', 'text/plain');
  res.send('succes');
});


// graphql routes
app.post('/graphql', bodyParser.json(), graphqlExpress(
  {
    schema,
    context: {
      loaders: { Transaction: {} }
    }
  })
);
app.use('/graphiql', graphiqlExpress(
  {
    endpointURL: '/graphql'
  })
);



const server = app.listen(SERVER_PORT, () => {
  // tslint disable
  console.log(`Server listening on port: ${SERVER_PORT}`);
});
