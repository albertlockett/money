import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { routes } from './components/login/LoginRoutes';
import { LoginApp } from './components/login/LoginApp';
import { LoginPage } from './components/login/LoginPage';

import './sass/main.scss';

console.log("HAKDFJAKJFSD");

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