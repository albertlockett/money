import * as React from 'react';
import { graphql, ChildProps } from 'react-apollo';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { 
  Breadcrumb,
  Container,
  Grid,
  Header
} from 'semantic-ui-react';
import { RegistrationForm } from './RegistrationForm';


type PropTypes = {
  createAccount: (
    username: string,
    password: string,
    confirmPassword: string
  ) => Promise<Response>;
};

type State = {
  error: string;
};

export class UnwrappedRegistrationPage extends 
    React.Component<PropTypes, State> {

  constructor(props, context) {
    super(props, context);
    this.createAccount = this.createAccount.bind(this);

    this.state = { error: null };
  }

  private async createAccount(vars: { 
    username: string,
    password: string, 
    confirmPassword: string 
  }) {
    console.log('making request');
    try {
      const result = await this.props.createAccount(
        vars.username, 
        vars.password, 
        vars.confirmPassword
      );
    } catch(e) {
      const message = e.message.split('GraphQL error: ')[1];
      this.setState({ error: message });
    }
  }


  public render() {

    return (
      <div className="registration-page">
        <Container className="registration-page-container">
          <Breadcrumb>
            <Breadcrumb.Section>
              <Link to="/login">Home</Link>
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon='right angle' />
            <Breadcrumb.Section active>Create Account</Breadcrumb.Section>
          </Breadcrumb>
          <Header as="h1">Create Account</Header>
          <Grid>
            <Grid.Column width={6}>
            <RegistrationForm 
                error={this.state.error}
                onSubmit={this.createAccount}/>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

const CREATE_ACCOUNT = gql`mutation createAccount(
  $username: String!
  $password: String!
  $confirmPassword: String!
) {
  createUser(
    username: $username
    password: $password
    confirmPassword: $confirmPassword
  ) {
    username
  }
}`;

type Response = {
  username: string
};
type InputProps = {
  password: string;
  confirmPassword: string;
  username: string
};


export const RegistrationPage = 
    graphql<Response, InputProps, PropTypes>(
  CREATE_ACCOUNT, {
  props: ({ mutate }) => ({
    createAccount: (
      username: string,
      password: string,
      confirmPassword: string
    ) => mutate({ variables: { username, confirmPassword, password } })
  })
})(UnwrappedRegistrationPage);
