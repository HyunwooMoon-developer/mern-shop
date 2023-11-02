import { gql } from 'graphql-tag';
import User_Type from './User/User_Type.js';
import Category_Type from './Category/Category_Type.js';
import Product_Type from './Product/Product_Type.js';
import Cart_Type from './Cart/Cart_Type.js';
import Order_Type from './Order/Order_Type.js';

const misc_Schema = gql`
  type SuccessResult {
    success: Boolean
  }
`;

const typeDefs = [
  misc_Schema,
  User_Type,
  Cart_Type,
  Category_Type,
  Order_Type,
  Product_Type,
];

export default typeDefs;
