import * as React from 'react';
import { Link } from 'react-router-dom';
import { 
  Breadcrumb,
  Container,
  Button,
  Form,
  Grid,
  Header,
  Input
} from 'semantic-ui-react';

export class RegistrationPage extends React.Component<{}, {}> {

  render() {
    return (
      <div className="registration-page">
        <Container className="registration-page-container">
          <Breadcrumb>
            <Breadcrumb.Section>
              <Link to="/login">Home</Link>
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon='right angle' />
            <Breadcrumb.Section active>Create account</Breadcrumb.Section>
          </Breadcrumb>
          <Header as="h1">Create Account</Header>
          <Grid>
            <Grid.Column width={6}>
              <Form>
                <Form.Field>
                  <label htmlFor="username">Username</label>
                  <Input name="username" />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="password">Password</label>
                  <Input name="password" type="password"/>
                </Form.Field>
                <Form.Field>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Input name="confirmPassword" type="password" />
                </Form.Field>
                <Form.Field>
                  <div>
                    <Button color="blue" floated="right">Create Account</Button>
                  </div>
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    )
  }

}