import * as React from 'react';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import { Container } from 'semantic-ui-react';
import { Header } from './common/header';
import { HomePage } from './HomePage';
import { TransactionPage } from './transaction/TransactionPage';
import { DraftVimPage } from './DraftVimPage';

export class App  extends React.Component<{}, {}> {
  public render() {
    return (
      <Container>
        <Header />
        <Router history={createBrowserHistory({})}>
          <div>
            <Route exact path="/" component={HomePage} />
            <Route expact path="/transactions/*" component={TransactionPage} />
            <Route expact path="/draft-vim" component={DraftVimPage} />
          </div>
        </Router>
      </Container>
    );
  }
}
