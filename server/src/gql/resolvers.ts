import User_Mutation from './User/User_Mutation.js';
import Category_Query from './Category/Category_Query.js';
import Product_Mutation from './Product/Product_Mutation.js';
import Product_Query from './Product/Product_Query.js';
import Cart_Mutation from './Cart/Cart_Mutation.js';
import Cart_Query from './Cart/Cart_Query.js';
import Order_Mutation from './Order/Order_Mutation.js';
import Order_Query from './Order/Order_Query.js';

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
