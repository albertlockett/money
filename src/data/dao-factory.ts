import Transaction from '../model/transaction';
import Model from '../model/model';
import DataAccessObject from './data-access-object';


export class DaoFactory {
  static getDao<T extends Model>(T): DataAccessObject<T> {
    switch(T) {
      case Transaction:
        return new DataAccessObject('Transactions');
    }
  }
}

export default DaoFactory;
