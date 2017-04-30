import * as DataLoader from 'dataloader';
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
    console.log(transaction, args, context);
    if(!context.loaders.Transaction.type) {
      context.loaders.Transaction.type = new TransactionTypeLoader();
    }
    return context.loaders.Transaction.type.load(transaction);
  }

};


// Queries for types of Transaction
export const Query = {

  async transactions(root, args, context) {
    let dao = DaoFactory.getDao(Transaction);
    return await dao.findAll();
  }

}

// Mutations for types of Transaction
export const Mutation = {

  async createTransaction(root, { amount, transactionType, date }, context) {

    // lookup transaction type
    const typeDao = DaoFactory.getDao(TransactionType);
    transactionType =  await typeDao.find({ value: transactionType });

    // save transaction
    let transaction = new Transaction(amount, transactionType._id, date);
    const transactionDao = DaoFactory.getDao(Transaction);
    await transactionDao.create(transaction);

    return transaction;
  }

}


export const TransactionResolver: TypeResolver = {
  propertyResolvers,
  Query,
  Mutation
}
