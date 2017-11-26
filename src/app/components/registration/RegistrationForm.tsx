import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Button, Form, Input } from 'semantic-ui-react';
import { 
  PasswordError, 
  RegistrationPasswordInput,
  validatePassword
} from './RegistrationPasswordInput';
import { RegistrationConfirmPasswordInput } from './RegistrationConfirmPasswordInput';
import { attemptSubmit, reset, updateField } from '../../actions/registration-actions';
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
  submitAttempted: boolean;
}

interface DispatchPropTypes {
  attemptSubmit: () => void;
  reset: () => void;
  updateField: (value: string, name: string) => void;
}

type PropTypes = PassedPropTypes & StatePropTypes & DispatchPropTypes;


export class UnwrappedRegistrationForm 
    extends React.Component<PropTypes, State> {
  
  constructor(props, context) {
    super(props, context);

    // bind class methods
    this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  onSubmit() {
    this.props.attemptSubmit();

    // check if form is valid and if not, cancel form submission
    let formIsValid = true;
    if(this.props.errors.username) formIsValid = false;
    if(this.props.errors.confirmPassword) formIsValid = false;
    if(!this.props.errors.password.valid) formIsValid = false;
  }

  render() {
    return (
      <Form>
        <Form.Field 
            error={(
                 this.props.submitAttempted
              && this.props.errors.username !== undefined
            )}
            required>
          <label htmlFor="username">Username</label>
          <Input 
              name="username" 
              onChange={this.onChangeUsername} 
              value={this.props.username} />
        </Form.Field>
        <Form.Field 
            error={(
                 !this.props.errors.password.valid
              && this.props.submitAttempted
            )}
            required>
          <label htmlFor="password">Password</label>
          <RegistrationPasswordInput 
              error={this.props.errors.password}
              onChange={this.onPasswordChange} 
              value={this.props.password} />
        </Form.Field>
        <Form.Field 
            error={(
                 this.props.submitAttempted 
              && this.props.errors.confirmPassword !== undefined
            )}
            required>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <RegistrationConfirmPasswordInput 
              error={this.props.errors.confirmPassword}
              onChange={this.onConfirmPasswordChange}
              value={this.props.confirmPassword} />
        </Form.Field>
        <Form.Field>
          <div>
            <Button color="blue" floated="right" onClick={this.onSubmit}>
              Create Account
            </Button>
          </div>
        </Form.Field>
      </Form>
    );
  }

}


type FormErrors = {
  password: PasswordError;
  confirmPassword?: string;
  username?: string;
};
type FormValues = {
  confirmPassword: string,
  password: string,
  username: string
};
const validate: (values: FormValues) => FormErrors = ({
  username, password, confirmPassword
}) => {

  const errors: FormErrors = {
    password: validatePassword(password)
  };

  if(confirmPassword !== password) {
    errors.confirmPassword = 'passwords must match';
  }

  if(!username) {
    errors.username = 'username cannot be blank';
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
  submitAttempted: registration.submitAttempted
});

const mapDispatchToProps: (dispatch: Dispatch<State>) => DispatchPropTypes = (
  dispatch
) => bindActionCreators({ attemptSubmit, reset, updateField }, dispatch);

export const RegistrationForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnwrappedRegistrationForm);