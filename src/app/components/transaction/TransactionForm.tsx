import * as React from 'react';
import { Button, Dropdown, Form, Input } from 'semantic-ui-react';
import { SingleDatePicker } from '../common/SingleDatePicker';

export class TransactionForm extends React.Component {

  public render() {

    const typeOptions = [
      { text: "test", values: 0 }
    ];

    const subtypeOptions = [
      { text: "test", value: 0}
    ];
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
          <Dropdown name="subtype" fluid selection options={typeOptions} />
        </Form.Field>
        <Form.Field>
          <label htmlFor="subtype">Subtype</label>
          <Dropdown name="subtype" fluid selection options={subtypeOptions} />
        </Form.Field>
        <Form.Field>
          <Button color="blue" floated="right">Save</Button>
        </Form.Field>
      </Form>
    );
  }

}
