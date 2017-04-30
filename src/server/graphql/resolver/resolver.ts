import * as _ from 'lodash';
import { TypeResolver } from './type-resolver';
import { transactionResolver } from './transaction-resolver';
import { transactionTypeResolver } from './transaction-type-resolver';


function combineResolvers(resolvers: { [s: string]: TypeResolver; }) {

  let rootResolver = {
    Query: {},
    Mutation: {}
  };

  _.forEach(resolvers, (resolver: TypeResolver, key) => {
    rootResolver[key] = resolver.propertyResolvers;
    rootResolver.Query = Object.assign(rootResolver.Query, resolver.query);
    rootResolver.Mutation = Object.assign(rootResolver.Mutation,
      resolver.mutation);
  });

  return rootResolver;
}

const resolver = combineResolvers({
  Transaction: transactionResolver,
  TransactionType: transactionTypeResolver
});


export default resolver;
