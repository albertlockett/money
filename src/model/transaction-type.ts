import Model from './model';
import TransactionSubtype from './transaction-subtype';

export class TransactionType implements Model {
  _id?: number;
  name: string;
  value: number;
  subtypes: TransactionSubtype[]
}

export default TransactionType;
