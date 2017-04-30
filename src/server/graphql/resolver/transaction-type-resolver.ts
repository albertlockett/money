import * as _ from 'lodash';
import { TypeResolver } from './type-resolver';
import { DaoFactory } from '../../../data/dao-factory';
import { TransactionType } from '../../../model/transaction-type';
import { TransactionSubtype } from '../../../model/transaction-subtype';

// helpful utility functions

const _findMaxValue = (entities): number => {
  return entities.reduce((currentMax, t) => {
    return t.value > currentMax ? t.value : currentMax;
  }, 0);
};

const getNextTypeValue = async (): Promise<number> => {
  let dao = DaoFactory.getDao(TransactionType);
  let allTypes = <TransactionType[]> await dao.findAll();
  return 1 + _findMaxValue(allTypes);
};

const getNextSubtypeValue = (subtypes: TransactionSubtype[]): number => {
  return 1 + _findMaxValue(subtypes);
};


export const query = {

  async transactionTypes(root, args, context) {
    let dao = DaoFactory.getDao(TransactionType);
    return dao.findAll();
  }

};

export const mutation = {

  async addSubtype(root, args, context) {
    const dao = DaoFactory.getDao(TransactionType);

    // lookup transaction type
    const transactionType = <TransactionType> await dao.find({
      value: args.transactionType
    });
    if(!transactionType) {
      throw new Error(
        `transaction type type could not be found with value: ` +
        `${args.transactionType}`
      );
    }


    // check if a subtype with this name exists and if it does, don't create 2
    const subtypes = transactionType.subtypes;
    const subtypeExists = _.find(subtypes, t => t.name === args.name);
    if(subtypeExists) {
      throw new Error(`a subtype with name: ${args.name} alread exists`);
    }

    // save the new subtype
    const subtype = { name: args.name, value: getNextSubtypeValue(subtypes) };
    transactionType.subtypes.push(subtype);
    await dao.update(transactionType);
    return transactionType;
  },


  async createTransactionType(root, { name }, context) {
    const dao = DaoFactory.getDao(TransactionType);

    // check if a type with this name already exists
    if(await dao.find({ name })) {
      throw new Error(`A type with this name already exists`);
    }

    let transactionType: TransactionType = {
      name,
      value: await getNextTypeValue(),
      subtypes: []
    };
    await dao.create(transactionType);
    return transactionType;
  }

};

export const transactionTypeResolver: TypeResolver = {
  propertyResolvers: {},
  query,
  mutation
};
