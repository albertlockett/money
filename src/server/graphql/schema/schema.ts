
// Define types
const Transaction:string = `
  type Transaction {
    date: String
    amount: String
    type: TransactionType
    subtype: TransactionSubtype
  }
`;

const TransactionType:string = `
  type TransactionType {
    name: String!
    value: Int!
    subtypes: [TransactionSubtype]
  }
`

const TransactionSubtype:string = `
  type TransactionSubtype {
    name: String!
    value: Int!
  }
`;

const types:string[] = [
  Transaction,
  TransactionType,
  TransactionSubtype
];

// Define Queries
const Query:string = `
  type Query {
    transactions: [Transaction]
    transactionTypes: [TransactionType]
  }
`;


// define Mutations
const Mutation:string = `
  type Mutation {
    createTransaction(
      date: String!
      amount: Float!
      transactionType: Int!
      transactionSubtype: Int
    ): Transaction
  }
`

// Define schema
const schema:string = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

export default  [
  schema, Query, Mutation, ...types
];
