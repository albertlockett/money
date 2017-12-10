import * as React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { Breadcrumb, Grid, Header } from 'semantic-ui-react';
import { TransactionForm } from './TransactionForm';


type PropTypes = {
  transactionTypes: TransactionType[]
};

export class UnwrappedTransactionPage extends React.Component<PropTypes, {}> {

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
            <TransactionForm transactionTypes={this.props.transactionTypes} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}


const GET_TXN_TYPES = gql`query getTransactionTypes {
  transactionTypes {
    name
    value
    subtypes {
      name
      value
    }
  }
}`;

type TransactionType = {
  name: string;
  value: number;
  subtypes: { name: string, value: number }[]
};

type Response = {
  transactionTypes: TransactionType[]
};


export const TransactionPage = graphql<Response, PropTypes>(
  GET_TXN_TYPES, {
    props: ({ data, ownProps }) => {
      return {
        transactionTypes: (
          data.transactionTypes || ownProps.transactionTypes || []
        )
      };
    }
  }
)(UnwrappedTransactionPage);
