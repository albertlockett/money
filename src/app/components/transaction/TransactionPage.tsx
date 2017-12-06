import * as React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Grid, Header } from 'semantic-ui-react';
import { TransactionForm } from './TransactionForm';

export class TransactionPage extends React.Component {

  public render() {

    // TODO - check actual route and see if its create, update, etc and if
    // it isn't - just return to home page or show 404 or something

    return (
      <div className="transaction-page">
        <Breadcrumb>
          <Breadcrumb.Section>
            <Link to="/">Home</Link>
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon='right angle' />
          <Breadcrumb.Section>Transactions</Breadcrumb.Section>
        </Breadcrumb>
        <br /><br />
        <Grid>
          <Grid.Column width={6}>
            <Header as="h1">Create Transaction</Header>
            <TransactionForm />
          </Grid.Column>
        </Grid>
      </div>
    );
  }

}
