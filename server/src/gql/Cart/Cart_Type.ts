import { gql } from 'graphql-tag';

const Cart_Type = gql`
  type Cart {
    id: ID!
    user: ID!
    products: [CartProduct]!
  }

  type CartProduct {
    product: Product
    size: String
    color: String
    quantity: Int
  }

  type Query {
    getCart: Cart!
  }

  type Mutation {
    updateCart(id: ID!, input: [CartInput]!): SuccessResult!
  }

  input CartInput {
    product: ID!
    quantity: Int
    size: String
    color: String
  }
`;

export default Cart_Type;
