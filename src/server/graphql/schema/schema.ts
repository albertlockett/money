
// Define types
const Transaction:string = `
  type Transaction {
    date: String
    amount: String
    type: String
    subtype: String
  }
`;

const types: string[] = [ Transaction ]

// Define Queries
const Query: string = `
  type Query {
    transactions: [Transaction]
  }
`;

// Define schema
const schema:string = `
  schema {
    query: Query
  }
`;

export default  [
  schema, Query, ...types
];
