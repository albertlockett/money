
// Define types
const transaction: string = `
  type Transaction {
    amount: String
    date: String
    description: String
    type: TransactionType
    subtype: TransactionSubtype
  }
`;

const transactionType: string = `
  type TransactionType {
    name: String!
    value: Int!
    subtypes: [TransactionSubtype]
  }
`;

const transactionSubtype: string = `
  type TransactionSubtype {
    name: String!
    value: Int!
  }
`;

const types: string[] = [
  transaction,
  transactionType,
  transactionSubtype
];

// Define Queries
const query: string = `
  type Query {
    transactions: [Transaction]
    transactionTypes: [TransactionType]
  }
`;


// define Mutations
const mutation: string = `
  type Mutation {

    addSubtype(
      name: String!
      transactionType: Int!
    ): TransactionType

    createTransaction(
      date: String!
      amount: Float!
      transactionType: Int!
      description: String
      transactionSubtype: Int
    ): Transaction

    createTransactionType(
      name: String!
    ): TransactionType

  }
`;

// Define schema
const schema: string = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

export default  [
  schema, query, mutation, ...types
];
