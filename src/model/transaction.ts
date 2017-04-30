import Model from './Model';
import TransactionType from './transaction-type';
import TransactionSubtype from './transaction-subtype';

export class Transaction extends Model {
  public amount: number;
  public date: Date;
  public description: string;
  public type: TransactionType;
  public subtype: TransactionSubtype;

  constructor(
    amount: number,
    type: TransactionType,
    date: Date,
    description?: string,
    subtype?: TransactionSubtype
  ) {
    super();
    this.amount = amount;
    this.date = date || new Date();
    this.type = type;
    this.subtype = subtype;
    this.description = description;
  }
}

export default Transaction;
