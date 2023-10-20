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
    addOrder(input: OrderInput): Order!

    updateOrder(id: ID!, input: OrderInput): Order!
  }

  input OrderInput {
    orderList: ID!
    amount: Float!
    address: BillingAddressInput
    status: String
  }

  input BillingAddressInput {
    street: String
    unit: String
    city: String
    state: String
    zip: String
  }
`;

export default Order_Type;
