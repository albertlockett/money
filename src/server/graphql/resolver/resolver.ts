import { Query as transactionQueries } from './transaction-resolver';

export default {
  Query: {
    transactions: transactionQueries.transactions
  }
}
