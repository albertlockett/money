import Model from './model';
import TransactionSubtype from './transaction-subtype';

export class TransactionType extends Model {
  public name: string;
  public value: number;
  public subtypes: TransactionSubtype[];
}

export default TransactionType;
