import { GraphQLError } from 'graphql';
import checkAuth from '../../utils/checkAuth';
import Cart from '../../models/CartModel';

const Cart_Query = {
  Query: {
    getCart: async (_: any, args: any, context: any) => {
      const user = checkAuth(context);

      if (!user) {
        throw new GraphQLError(`Invalid User`, {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      try {
        const cart = await Cart.findOne({ user: user.id })
          .sort({
            updatedAt: -1,
          })
          .populate('products.product');

        if (cart) {
          return cart;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export default Cart_Query;
