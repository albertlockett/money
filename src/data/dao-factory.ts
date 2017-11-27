import DataAccessObject from './data-access-object';
import Model from '../model/model';
import Transaction from '../model/transaction';
import TransactionType from '../model/transaction-type';
import User from '../model/user';


export class DaoFactory {

  public static getDao<T extends Model>(T): DataAccessObject<T> {

    switch(T) {
      case Transaction:
        return new DataAccessObject('Transactions');

      case TransactionType:
        return new DataAccessObject('TransactionTypes');

      case User:
        return new DataAccessObject('User');

      default:
        throw new Error(`No Data Access Object found for Type ${T}`);
    }


  }
}

export default DaoFactory;
