import 'babel-polyfill';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import * as path from 'path';
import { addWebpackHMR } from './webpack-hmr';
import { SERVER_PORT } from '../config/config';
import schema from './graphql/executable-schema';


const app = express();

// setup routes for static content
const staticRoutes: string[] = [
  '/',
  '/bundle.js',
  '/images/*.jpg',
  '/images/*.jpg',
  '/index.html',
  '/style.css'
];
const DOCBASE = path.join(__dirname, '..', '..', 'docbase');
app.get(staticRoutes, express.static(DOCBASE));

app.get('/test', (req, res) => {
  res.set('Content-type', 'text/plain');
  res.send('succes');
});

addWebpackHMR(app);

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
