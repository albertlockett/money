import * as React from 'react';
import { Icon, Input, Popup } from 'semantic-ui-react';

export type PasswordError = {
  hasLetter: boolean;
  hasNumber: boolean;
  isLongEnough: boolean;
  valid: boolean;
}

/**
 * Validate password based on available rules
 * @param password {String} password to validate
 */
export const validatePassword: (password: string) => PasswordError = password => {

  const error: PasswordError = {
    hasLetter: false,
    hasNumber: false,
    isLongEnough: false,
    valid:false
  };

  if(password.length >= 6) { 
    error.isLongEnough = true;
  }

  if(password.match(/[a-zA-Z]/)) {
    error.hasLetter = true;
  }

  if(password.match(/[0-9]/)) {
    error.hasNumber = true;
  }

  if(error.hasLetter && error.hasNumber && error.isLongEnough) {
    error.valid = true;
  }

  return error;
};


type PropTypes = {
  error: PasswordError;
  onChange: (event: object) => void;
  value: string
}

export class RegistrationPasswordInput extends React.Component<PropTypes, {}> {

  render() {

    const input = (
      <Input 
          name="password" 
          onChange={this.props.onChange} 
          type="password"  
          value={this.props.value} />
    );

    const ruleLabels = {
      hasLetter: 'Must contain a letter a-z',
      hasNumber: 'Must contain a number 0-9',
      isLongEnough: 'Must be at least 6 characters'
    };

    // add status of password rules to popup
    const popupContent = [];
    for(let key of ['isLongEnough', 'hasNumber', 'hasLetter']) {
      let iconColor:any = "red", iconName:any ="remove circle";
      if(this.props.error[key]) {
        iconColor = "green";
        iconName = "check circle";
      }

      popupContent.push(
        <div key={key} className="popup-rule">
          <Icon color={iconColor} name={iconName}/>
          <span>{ruleLabels[key]}</span>
        </div>
      );
    }

    return (
      <Popup 
          content={popupContent}
          flowing
          on="focus"
          position="right center"
          trigger={input}/>
    );
  }

}