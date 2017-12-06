import * as React from 'react';
import { SingleDatePicker as VendorSDP } from 'react-dates';

type State = {
  focused: boolean;
  date: any; // TODO - make moment object
};

export class SingleDatePicker extends React.Component<{}, State> {

  constructor(props, context) {
    super(props, context);

    this.onFocusChange = this.onFocusChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);

    this.state = { 
      focused: false,
      date: null
    };
  }

  private onDateChange(date) {
    console.log('onDateChange ran');
    this.setState({ date });
  }

  private onFocusChange({ focused }) {
    this.setState({ focused });
  }

  public render() {
    console.log(this.state);
    return(
      <VendorSDP 
          date={this.state.date}
          focused={this.state.focused}
          onFocusChange={this.onFocusChange}
          onDateChange={this.onDateChange} />
    );
  }

}
