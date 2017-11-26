import * as React from 'react';
import { Button, Input } from 'semantic-ui-react';
import Card from 'semantic-ui-react/dist/es/views/Card';
import Form from 'semantic-ui-react/dist/es/collections/Form';
import Grid from 'semantic-ui-react/dist/es/collections/Grid';



export class LoginPage extends React.Component<{}, {}> {
  render() {
    return (
      <div className="login-page">
        <Grid
            centered
            className="login-form-container"
            columns={5}
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
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
