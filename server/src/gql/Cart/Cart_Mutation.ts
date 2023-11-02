import { GraphQLError } from 'graphql';
import checkAuth from '../../utils/checkAuth.js';
import Cart from '../../models/CartModel.js';

const Cart_Mutation = {
  Mutation: {
    updateCart: async (
      _: any,
      args: {
        id: string;
        input: {
          product: string;
          quantity: number;
          size?: string;
          color?: string;
        }[];
      },
      context: any
    ) => {
      const { id, input } = args;
      const user = await checkAuth(context);

      if (!user) {
        if (!user) {
          throw new GraphQLError(`Invalid User`, {
            extensions: { code: 'UNAUTHENTICATED' },
          });
        }
      }

      try {
        const updatedCart = await Cart.findByIdAndUpdate(id, {
          products: input,
        });

        if (updatedCart) {
          return {
            success: true,
          };
        } else {
          return {
            success: false,
          };
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export default Cart_Mutation;
