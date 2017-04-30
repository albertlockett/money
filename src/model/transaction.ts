import Model from './Model';
import TransactionType from './transaction-type';
import TransactionSubtype from './transaction-subtype';

export class Transaction implements Model {
  _id?: number;
  amount: number;
  date: Date;
  type: TransactionType;
  subtype: TransactionSubtype;
  static collectionName: string = 'Transactions';

  constructor(
    amount: number,
    type: TransactionType,
    date: Date,
    subtype?: TransactionSubtype,
  ) {
    this.amount = amount;
    this.type = type;
    this.subtype = subtype;
    this.date = date || new Date();
  }
}

export default Transaction;
