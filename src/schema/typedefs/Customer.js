import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Customer {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
  }
  input CreateCustomerInput {
    firstName: String!
    lastName: String!
    email: String!
  }
  input UpdateCustomerInput {
    id: Int!
    firstName: String
    lastName: String
    email: String
  }
  type Query {
    customer(id: Int!): Customer,
    customers: [Customer]
  }
  type Mutation {
    updateCustomer(input: UpdateCustomerInput!): Customer,
    createCustomer(input: CreateCustomerInput!): Customer,
    deleteCustomer(id: Int!): Boolean
  }
`);

export default schema;