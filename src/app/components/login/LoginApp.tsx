import * as React from 'react';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import { LoginPage } from './LoginPage';
import { RegistrationPage } from './RegistrationPage';

export class LoginApp extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <Router history={createBrowserHistory({})}>
          <div>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/create-account" component={RegistrationPage} />
          </div>
        </Router>
      </div>

    )
  }
}