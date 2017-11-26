import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App';

import './sass/main.scss';

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);

// Handle hot reloading requests from Webpack
if (module.hot) {
  console.log('module is hot');
  module.hot.accept('./components/App', () => { 
    const App = require('./components/App').App;
    ReactDOM.render(
      <App />,
      document.getElementById('app'),
    );
  });
}
