import * as _ from 'lodash';
import * as React from 'react';
import { Button, Dropdown, Form, Input } from 'semantic-ui-react';
import { SingleDatePicker } from '../common/SingleDatePicker';

type PropTypes = {
  transactionTypes: { 
    name: string, 
    value: number,
    subtypes: { name: string, value: number }[]
   }[]
};

type State = {
  typeValue: number;
};


export class TransactionForm extends React.Component<PropTypes, State> {

  constructor(props, context) {
    super(props, context);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.state = { typeValue: undefined };
  }


  private onTypeChange(event, data) {
    this.setState({ typeValue: data.value });
  }


  private makeOptions(transactionTypes) {
    return transactionTypes.map(tt => ({
      text: _.capitalize(tt.name), value: tt.value
    }));
  }


  public render() {

    const typeOptions = this.makeOptions(this.props.transactionTypes);

    let subtypeOptions = [];
    const selectedType = this.props.transactionTypes
        .find(tt => tt.value === this.state.typeValue);
    if(selectedType) { 
      subtypeOptions = this.makeOptions(selectedType.subtypes);
    }


    return (
      <Form>
        <Form.Field>
          <label htmlFor="amount">Amount</label>
          <Input name="amount" />
        </Form.Field>
        <Form.Field>
          <label htmlFor="description">Date</label>
          <SingleDatePicker />
        </Form.Field>
        <Form.Field>
          <label htmlFor="description">Description</label>
          <Input name="description" />
        </Form.Field>
        <Form.Field>
          <label htmlFor="type">Type</label>
          <Dropdown 
              fluid 
              selection 
              name="subtype" 
              onChange={this.onTypeChange}
              options={typeOptions} />
        </Form.Field>
        <Form.Field>
          <label htmlFor="subtype">Subtype</label>
          <Dropdown 
              fluid 
              selection
              name="subtype"  
              options={subtypeOptions} />
        </Form.Field>
        <Form.Field>
          <Button color="blue" floated="right">Save</Button>
        </Form.Field>
      </Form>
    );
  }

}
