import TransactionType from './transaction-type';
import TransactionSubtype from './transaction-subtype';

export class Transaction {
  _id: number;
  amount: number;
  date: Date;
  type: TransactionType;
  subtype: TransactionSubtype;

  constructor(amount: number, type: TransactionType,
      subtype: TransactionSubtype, date?: Date) {

    this.amount = amount;
    this.type = type;
    this.subtype = subtype;
    this.date = date || new Date();
  }
}

export default Transaction;
