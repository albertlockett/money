import * as React from 'react';
import { Icon, Input, Popup } from 'semantic-ui-react';

type PropTypes = {
  onChange: (event: object) => void,
  error: string;
  value: string;
}

export class RegistrationConfirmPasswordInput 
    extends React.Component<PropTypes, {}> {

  render() {
    const input = (
      <Input
        name="confirmPassword"
        onChange={this.props.onChange}
        type="password"
        value={this.props.value} />
    );

    let iconColor: any = "green", iconName: any = "check cirlce";
    if(this.props.error) {
      iconColor = "red";
      iconName = "remove circle";
    }

    const popupContent = (
      <div className="popup-rule">
      <Icon color={iconColor} name={iconName}/>
      <span>Passwords must match</span>
    </div>
    )

    return (
      <Popup
        content={popupContent}
        flowing
        on="focus"
        position="right center"
        trigger={input} />
    );

  }
}