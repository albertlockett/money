import * as DataLoader from 'dataloader';
import * as _ from 'lodash';
import { TypeResolver } from './type-resolver';
import DaoFactory from '../../../data/dao-factory';
import { Transaction } from '../../../model/transaction';
import { TransactionType } from '../../../model/transaction-type';


// Data Loaders for Transaction Properties

class TransactionTypeLoader extends DataLoader<Transaction, TransactionType> {
  constructor() {
    super(async transactions => {

      // at this point the transaction types are probably still mongo FKs
      const transactionTypeIds = transactions.map(t => t.type);

      // look up the transactions
      const typeDao = DaoFactory.getDao(TransactionType);
      let transactionTypes  = <TransactionType[]> await typeDao.findAll({
         _id: { $in: [transactionTypeIds] }
       });

       // create a lookup map of transaciton type by id
      let typeMap = transactionTypes.reduce((last, type) => {
        last[type._id] = type;
        return last;
      }, {});

      // sort results and return
      return transactionTypeIds.map(id => typeMap[String(id)]);
    });
  }
}


// Property Resolvers for type of Transaction
export const propertyResolvers = {

  type: (transaction, args, context) => {
    if(!context.loaders.Transaction.type) {
      context.loaders.Transaction.type = new TransactionTypeLoader();
    }
    return context.loaders.Transaction.type.load(transaction);
  },


  subtype: async (transaction, args, context) => {
    // assume at this point that transaction has had subtype saved as value key
    let type = await propertyResolvers.type(transaction, args, context);
    return _.find(type.subtypes, s => s.value === transaction.subtype);
  }

};


// Queries for types of Transaction
export const query = {

  async transactions(root, args, context) {
    let dao = DaoFactory.getDao(Transaction);
    return await dao.findAll();
  }

};

// Mutations for types of Transaction
export const mutation = {

  async createTransaction(root, args, context) {
    let {
      amount,
      date,
      description,
      transactionSubtype,
      transactionType
    } = args;

    // lookup transaction type
    const typeDao = DaoFactory.getDao(TransactionType);
    transactionType =  await typeDao.find({ value: transactionType });
    if(!transactionType) {
      throw new Error(``
        + `Did not find transaction type with value of: ${transactionType}`
      );
    }

    // if subtype is supplied, check if that subtype exists on the txn type
    if(transactionSubtype) {
      let subtypes = transactionType.subtypes;
      if(!_.find(subtypes, t => t.value === transactionSubtype)) {
        throw new Error(``
          + `could not find subtype with value ${transactionSubtype} on `
          + `transaction type ${
            JSON.stringify(_.pick(transactionType, 'name', 'value', 'subtypes'))
          }`
        );
      }
    }


    // save transaction
    let transaction = new Transaction(
      amount,
      transactionType._id,
      date,
      description,
      transactionSubtype
    );
    const transactionDao = DaoFactory.getDao(Transaction);
    await transactionDao.create(transaction);

    return transaction;
  }

};


export const transactionResolver: TypeResolver = {
  propertyResolvers,
  query,
  mutation
};
