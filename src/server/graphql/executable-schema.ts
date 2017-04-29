import { makeExecutableSchema } from 'graphql-tools';
import schema from './schema/schema';
import resolver from './resolver/resolver';


export default makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolver
});
