import * as _ from 'lodash';
import { TypeResolver } from './type-resolver';
import { transactionResolver } from './transaction-resolver';
import { transactionTypeResolver } from './transaction-type-resolver';
import { userResolver } from './user-resolver';


function combineResolvers(resolvers: { [s: string]: TypeResolver; }) {

  let rootResolver = {
    Query: {},
    Mutation: {}
  };

  _.forEach(resolvers, (typeResolver: TypeResolver, key) => {
    rootResolver[key] = typeResolver.propertyResolvers;
    rootResolver.Query = Object.assign(rootResolver.Query, typeResolver.query);
    rootResolver.Mutation = Object.assign(rootResolver.Mutation,
      typeResolver.mutation);
  });

  return rootResolver;
}

const resolver = combineResolvers({
  Transaction: transactionResolver,
  TransactionType: transactionTypeResolver,
  User: userResolver
});


export default resolver;
