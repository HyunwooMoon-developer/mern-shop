import { GraphQLError } from 'graphql';
import checkAuth from '../../utils/checkAuth.js';
import Order from '../../models/OrderModel.js';
import { Stripe } from 'stripe';
import Cart from '../../models/CartModel.js';
import { config } from '../../utils/config.js';

const Order_Mutation = {
  Mutation: {
    addOrder: async (
      _: any,
      args: { input: { [key: string]: any } },
      context: any
    ) => {
      try {
        const user = checkAuth(context);

        if (!user) {
          throw new GraphQLError(`Invalid User`, {
            extensions: { code: 'UNAUTHENTICATED' },
          });
        }

        let stripe = new Stripe(config.server.STRIPE_KEY as string, {
          apiVersion: '2023-10-16',
        });

        const { orderList, amount, token, street, city, state, zip } =
          args.input;

        const cartList = await Cart.findById(orderList).populate(
          'products.product'
        );

        if (cartList && stripe) {
          const session = await stripe.charges.create({
            amount: parseInt((amount * 100).toFixed(0)),
            source: token,
            currency: 'usd',
            receipt_email: 'mhw9163@gmail.com',
          });

          const orderInfo = {
            orderList: {
              user: cartList.user,
              products: cartList.products.map((product: any) => ({
                id: product.id,
                color: product?.color,
                size: product?.size,
                quantity: product.quantity,
              })),
            },
            amount: amount,
            address: {
              street,
              city,
              state,
              zip,
            },
          };

          const newOrder = new Order(orderInfo);
          if (newOrder) {
            await newOrder.save();

            const cart = await Cart.findByIdAndUpdate(orderList, {
              products: [],
            });

            if (cart) {
              return { success: true };
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export default Order_Mutation;
