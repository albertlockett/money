import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import { LoginApp } from './LoginApp';
import { LoginPage } from './LoginPage';

export const routes = (
  <Route path="/login" component={LoginApp}>
    <IndexRoute component={LoginPage} />
  </Route>
);