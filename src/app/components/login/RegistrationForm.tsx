import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Button, Form, Input } from 'semantic-ui-react';
import { reset, updateField } from '../../actions/registration-actions';
import { State } from '../../reducers/registration-reducer';


// define prop types
interface PassedPropTypes {
  onSubmit: (values: object) => void;
}

interface StatePropTypes {
  confirmPassword: string;
  errors: FormErrors;
  password: string;
  username: string;
}

interface DispatchPropTypes {
  reset: () => void;
  updateField: (value: string, name: string) => void;
}

type PropTypes = PassedPropTypes & StatePropTypes & DispatchPropTypes;


export class UnwrappedRegistrationForm 
    extends React.Component<PropTypes, State> {
  
  constructor(props, context) {
    super(props, context);
    this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
  }

  componentWillMount() {
    this.props.reset();
  }

  onConfirmPasswordChange(event) {
    this.props.updateField(event.target.value, 'confirmPassword');
  }

  onPasswordChange(event) {
    this.props.updateField(event.target.value, 'password');
  }

  onChangeUsername(event) {
    this.props.updateField(event.target.value, 'username');
  }

  render() {
    return (
      <Form>
        <Form.Field>
          <label htmlFor="username">Username</label>
          <Input 
              name="username" 
              onChange={this.onChangeUsername} 
              value={this.props.username} />
        </Form.Field>
        <Form.Field>
          <label htmlFor="password">Password</label>
          <Input 
              name="password" 
              onChange={this.onPasswordChange}
              type="password" 
              value={this.props.password} />
        </Form.Field>
        <Form.Field error={this.props.errors.confirmPassword !== undefined}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <Input 
              name="confirmPassword" 
              onChange={this.onConfirmPasswordChange}
              type="password" 
              value={this.props.confirmPassword} />
        </Form.Field>
        <Form.Field>
          <div>
            <Button color="blue" floated="right">Create Account</Button>
          </div>
        </Form.Field>
      </Form>
    );
  }

}


type FormErrors = {
  confirmPassword?: string
};
type FormValues = {
  confirmPassword: string,
  password: string,
  username: string
};
const validate: (values: FormValues) => FormErrors = ({
  username, password, confirmPassword
}) => {

  const errors: FormErrors = {};

  if(confirmPassword !== password) {
    errors.confirmPassword = 'passwords must match';
  }

  return errors;
}



const mapStateToProps: (state: { registration: State }) => StatePropTypes = (
  { registration }
) => ({
  confirmPassword: registration.confirmPassword,
  password: registration.password,
  username: registration.username,
  errors: validate(registration),
});

const mapDispatchToProps: (dispatch: Dispatch<State>) => DispatchPropTypes = (
  dispatch
) => bindActionCreators({ reset, updateField }, dispatch);

export const RegistrationForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnwrappedRegistrationForm);