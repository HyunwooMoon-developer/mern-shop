import { gql } from 'graphql-tag';

const Order_Type = gql`
  type Order {
    id: ID!
    orderList: Cart
    amount: Float
    address: BillingAddress
    status: String
    createdAt: String
  }

  type BillingAddress {
    street: String
    unit: String
    city: String
    state: String
    zip: String
  }

  type Query {
    getOrders(user: ID!): [Order]!

    getOrder(id: ID!): Order!
  }

  type Mutation {
    addOrder(input: OrderInput): SuccessResult
  }

  input OrderInput {
    orderList: ID!
    token: String!
    amount: Float!
    street: String!
    city: String!
    state: String!
    zip: String!
  }
`;

export default Order_Type;
