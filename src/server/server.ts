import * as bodyParser from 'body-parser';
import * as express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { SERVER_PORT } from '../config/config';
import schema from './graphql/executable-schema';

require('babel-polyfill');
const app = express();


app.get('/', (req, res) => {
  res.set('Content-type', 'application/json');
  res.send(JSON.stringify({ status: 'success' }));
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
    endpointURL: '/graphql',
  })
);



const server = app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port: ${SERVER_PORT}`);
});
