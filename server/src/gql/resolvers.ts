import User_Mutation from './User/User_Mutation';
import Category_Query from './Category/Category_Query';
import Product_Mutation from './Product/Product_Mutation';
import Product_Query from './Product/Product_Query';
import Cart_Mutation from './Cart/Cart_Mutation';
import Cart_Query from './Cart/Cart_Query';
import Order_Mutation from './Order/Order_Mutation';
import Order_Query from './Order/Order_Query';

const resolvers = [
  User_Mutation,
  Cart_Mutation,
  Cart_Query,
  Category_Query,
  Order_Mutation,
  Order_Query,
  Product_Mutation,
  Product_Query,
];

export default resolvers;
