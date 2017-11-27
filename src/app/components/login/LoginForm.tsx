import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { Button, Input, Form, Label, Message } from 'semantic-ui-react';
import { 
  attemptSubmit, 
  reset, 
  updateField
} from '../../actions/login-actions';
import { State } from '../../reducers/login-reducer';

type PassedPropTypes = {
  error: boolean;
  handleLoginAttempt: (vars: { username: string, password: string }) => void
};

type StatePropTypes = {
  password: string;
  username: string;
};

type DispatchPropTypes = {
  reset: () => void;
  updateField: (value: string, name: string) => void;
};

type PropTypes = PassedPropTypes & StatePropTypes & DispatchPropTypes;

export class UnwrappedLoginForm extends React.Component<PropTypes, State> {

  constructor(props, context) {
    super(props, context);

    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
  }

  private onUsernameChange(event) {
    this.props.updateField(event.target.value, 'username');
  }

  private onPasswordChange(event) {
    this.props.updateField(event.target.value, 'password');
  }

  private onSubmit() {
    this.props.handleLoginAttempt({
      password: this.props.password,
      username: this.props.username
    });
  }

  public render() {
    return(
      <Form>
      <Form.Field>
        <label>Username</label>
        <Input 
            name="username" 
            onChange={this.onUsernameChange}
            value={this.props.username} />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <Input 
            name="password" 
            type="password" 
            onChange={this.onPasswordChange}
            value={this.props.password} />
      </Form.Field>
      <div>
        {this.props.error && (
          <Message negative>
            <p>Invalid username or password</p>
          </Message>
        )}
        <Link className="registration-link" to="/create-account">
          Create an account
        </Link>
        <Button
            color="blue"
            floated="right"
            onClick={this.onSubmit}
            type="button">
          Login
        </Button>
      </div>
    </Form>
    );
  }

}


const mapStateToProps: (
  state: { login: State }, ownProps: PassedPropTypes
) => StatePropTypes = (
  { login }
) => ({
  username: login.username,
  password: login.password
});

const mapDispatchToProps: (dispatch: Dispatch<State>) => DispatchPropTypes = (
  dispatch
) => bindActionCreators({ reset, updateField }, dispatch);

export const LoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnwrappedLoginForm);
