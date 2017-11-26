import * as React from 'react';
import { Link } from 'react-router-dom';
import { 
  Breadcrumb,
  Container,
  Grid,
  Header
} from 'semantic-ui-react';
import { RegistrationForm } from './RegistrationForm';

export class RegistrationPage extends React.Component<{}, {}> {

  constructor(props, context) {
    super(props, context);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values: object) {
    console.log('submission happened');
    console.log(values);
  }

  render() {
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
            <RegistrationForm/>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    )
  }

}