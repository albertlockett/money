import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { LoginApp } from './components/login/LoginApp';

import './sass/main.scss';

ReactDOM.render(
  <LoginApp />,
  document.getElementById('app'),
);

// Handle hot reloading requests from Webpack
if (module.hot) {
  console.log('module is hot');
  module.hot.accept('./components/login/LoginApp', () => { 
    const LoginApp = require('./components/login/LoginApp').LoginApp;
    ReactDOM.render(
      <LoginApp />,
      document.getElementById('app'),
    );
  });
}