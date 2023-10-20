import { gql } from 'graphql-tag';
import User_Type from './User/User_Type';
import Category_Type from './Category/Category_Type';
import Product_Type from './Product/Product_Type';
import Cart_Type from './Cart/Cart_Type';
import Order_Type from './Order/Order_Type';

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
