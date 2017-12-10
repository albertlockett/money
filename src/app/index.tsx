import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';
import 'react-dates/initialize';
import { client } from './client';
import { App } from './components/App';

import './sass/main.scss';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('app')
);

// Handle hot reloading requests from Webpack
if (module.hot) {
  console.log('module is hot');
  module.hot.accept('./components/App', () => { 
    const App = require('./components/App').App;
    ReactDOM.render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>,
      document.getElementById('app'),
    );
  });
}
