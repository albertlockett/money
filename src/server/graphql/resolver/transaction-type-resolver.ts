import { TypeResolver } from './type-resolver';
import DaoFactory from '../../../data/dao-factory';
import {
  TransactionType as TransactionTypeModel
} from '../../../model/transaction-type';

export const TransactionType = {

  subtypes: (root, args, context) => {
    return [];

  }
}


export const Query = {

  async transactionTypes(root, args, context) {
    let dao = DaoFactory.getDao(TransactionTypeModel);
    return await dao.findAll();
  }

}

export const TransactionTypeResolver: TypeResolver = {
  propertyResolvers: TransactionType,
  Query
}
