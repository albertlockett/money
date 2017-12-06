import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Label } from 'semantic-ui-react';
import Card from 'semantic-ui-react/dist/es/views/Card';
import Form from 'semantic-ui-react/dist/es/collections/Form';
import Grid from 'semantic-ui-react/dist/es/collections/Grid';
import { AmazonAuthButton } from './AmazonAuthButton';
import { LoginForm } from './LoginForm';

type State = { formError: boolean; };

export class LoginPage extends React.Component<{}, State> {

  constructor(props, context) {
    super(props, context);
    this.handleLoginAttempt = this.handleLoginAttempt.bind(this);
    this.state = { formError: false };
  }

  private async handleLoginAttempt(
    { username, password }: { username: string, password: string }
  ) {
    const result = await fetch('/login', {
      method: 'POST',
      credentials: 'same-origin',
      headers: [ ['Content-Type', 'application/json' ] ],
      body: JSON.stringify({ username, password })
    });
    if(result.status === 200) {
      window.location.href = '/';
    } else {
      this.setState({ formError: true });
    }
  }

  public render() {
    return (
      <div className="login-page">
        <Grid
            centered
            className="login-form-container"
            columns={3}
            verticalAlign="middle">
          <Grid.Row>
            <Grid.Column className="modal">
              <Card>
                <Card.Content>
                  <Card.Header>
                    Login
                  </Card.Header>
                </Card.Content>
                <Card.Content>
                  <Grid divided>
                    <Grid.Column width={7} className="partner-login">
                      <label className="field-label">
                        <br />
                      </label>
                      <AmazonAuthButton />
                    </Grid.Column>
                    <Grid.Column width={9} className="form-login">
                      <LoginForm 
                            error={this.state.formError}
                            handleLoginAttempt={this.handleLoginAttempt} />
                    </Grid.Column>
                  </Grid>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
