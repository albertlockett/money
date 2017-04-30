import Model from './model';
import TransactionSubtype from './transaction-subtype';

export class TransactionType implements Model {
  public _id?: number;
  public name: string;
  public value: number;
  public subtypes: TransactionSubtype[];
}

export default TransactionType;
