import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { routes } from './components/login/LoginRoutes';
import { LoginApp } from './components/login/LoginApp';
import { LoginPage } from './components/login/LoginPage';
import {
  reducer as loginReducer
} from './reducers/login-reducer';
import { 
  reducer as registrationReducer
} from './reducers/registration-reducer';

import './sass/main.scss';


// setup redux store
const store = createStore(
  combineReducers({
    login: loginReducer,
    registration: registrationReducer
  })
);


ReactDOM.render(
  <Provider store={store}>
    <LoginApp />
  </Provider>,
  document.getElementById('app')
);

// Handle hot reloading requests from Webpack
if (module.hot) {
  console.log('module is hot');
  module.hot.accept('./components/login/LoginApp', () => { 
    const LoginApp = require('./components/login/LoginApp').LoginApp;
    ReactDOM.render(
      <Provider store={store}>
        <LoginApp />
      </Provider>,
      document.getElementById('app'),
    );
  });
}