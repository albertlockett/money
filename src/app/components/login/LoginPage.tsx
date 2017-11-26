import * as React from 'react';
import { Button, Input, Label } from 'semantic-ui-react';
import Card from 'semantic-ui-react/dist/es/views/Card';
import Form from 'semantic-ui-react/dist/es/collections/Form';
import Grid from 'semantic-ui-react/dist/es/collections/Grid';
import { AmazonAuthButton } from './AmazonAuthButton';

export class LoginPage extends React.Component<{}, {}> {
  render() {
    return (
      <div className="login-page">
        <Grid
            centered
            className="login-form-container"
            columns={3}
            verticalAlign="middle">
          <Grid.Row>
            <Grid.Column>
              <Card>
                <Card.Content>
                  <Card.Header>
                    Login
                  </Card.Header>
                </Card.Content>
                <Card.Content>
                  <Grid divided>
                  <Grid.Column width={6}>
                      <label className="field-label">
                        <br />
                      </label>
                      <AmazonAuthButton />
                    </Grid.Column>
                    <Grid.Column width={10}>
                      <Form>
                        <Form.Field>
                          <label>Username</label>
                          <Input name="username" />
                        </Form.Field>
                        <Form.Field>
                          <label>Password</label>
                          <Input name="password" type="password" />
                        </Form.Field>
                        <div>
                          <Button
                              floated="right"
                              type="button">
                            Login
                          </Button>
                        </div>
                      </Form>
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
