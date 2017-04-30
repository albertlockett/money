import DataAccessObject from './data-access-object';
import Model from '../model/model';
import Transaction from '../model/transaction';
import TransactionType from '../model/transaction-type';


export class DaoFactory {

  static getDao<T extends Model>(T): DataAccessObject<T> {

    switch(T) {
      case Transaction:
        return new DataAccessObject('Transactions');

      case TransactionType:
        console.log("Returning a new dao for transaction type")
        return new DataAccessObject('TransactionTypes');
    }

    throw new Error(`No Data Access Object found for Type ${T}`);
  }
}

export default DaoFactory;
