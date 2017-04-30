import { TypeResolver } from './type-resolver';
import DaoFactory from '../../../data/dao-factory';
import { TransactionType } from '../../../model/transaction-type';

export const query = {

  async transactionTypes(root, args, context) {
    let dao = DaoFactory.getDao(TransactionType);
    return await dao.findAll();
  }

};

export const transactionTypeResolver: TypeResolver = {
  propertyResolvers: {},
  query
};
