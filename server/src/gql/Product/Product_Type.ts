import { gql } from 'graphql-tag';

const Product_Type = gql`
  type Product {
    id: ID!
    name: String!
    desc: String
    image: String
    price: Float
    quantity: Int
    category: Category
    size: [String]!
    color: [String]!
  }

  type Query {
    getProducts(category: ID, name: String): [Product]!

    getProduct(id: ID!): Product!
  }

  type Mutation {
    addProduct(input: ProductInput): Product!

    updateProduct(id: ID!, input: ProductInput): Product!

    deleteProduct(id: ID!): Product!
  }

  input ProductInput {
    name: String!
    desc: String
    image: String
    price: Float
    quantity: Int
    category: ID
    size: [String]!
    color: [String]!
  }
`;

export default Product_Type;
