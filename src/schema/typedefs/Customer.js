import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Customer {
    id: Int!
    firstName: String!
    lastName: String!
  }
  type Query {
    customer(id: Int!): Customer,
    customers: [Customer]
  }
  type Mutation {
    updateCustomer(id: Int!, firstName: String!): Customer
  }
`);

export default schema;