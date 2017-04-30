import * as _ from 'lodash';
import { TypeResolver } from './type-resolver';
import { TransactionResolver } from './transaction-resolver';
import { TransactionTypeResolver } from './transaction-type-resolver';


function combineResolvers(resolvers: { [s: string]: TypeResolver; }) {

  let rootResolver = {
    Query: {},
    Mutation: {}
  };

  _.forEach(resolvers, (resolver, key) => {
    rootResolver[key] = resolver.propertyResolvers;
    rootResolver.Query = Object.assign(rootResolver.Query, resolver.Query);
    rootResolver.Mutation = Object.assign(rootResolver.Mutation,
      resolver.Mutation);
  });

  return rootResolver;
}

const resolver = combineResolvers({
  Transaction: TransactionResolver,
  TransactionType: TransactionTypeResolver
});


export default resolver;
