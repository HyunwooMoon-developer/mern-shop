import { GraphQLError } from 'graphql';
import checkAuth from '../../utils/checkAuth';
import Order from '../../models/OrderModel';
import { Stripe } from 'stripe';
import Cart from '../../models/CartModel';

const Order_Mutation = {
  Mutation: {
    addOrder: async (
      _: any,
      args: { input: { [key: string]: any } },
      context: any
    ) => {
      const user = checkAuth(context);

      let stripe = new Stripe(process.env.STRIPE_KEY as string, {
        apiVersion: '2023-10-16',
      });

      const { orderList, amount, token, street, city, state, zip } = args.input;

      const cartList = (await Cart.findById(orderList).populate(
        'products.product'
      )) as any;

      if (cartList && stripe) {
        try {
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
        } catch (err) {
          console.log(err);
        }
      }
      /* if (!user) {
        throw new GraphQLError(`Invalid User`, {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const newOrder = new Order(args.input);

      try {
        await newOrder.save();

        return { success: true };
      } catch (err) {
        console.log(err);
      } */
    },
    /*    updateOrder: async (
      _: any,
      args: { id: string; input: { [key: string]: any } },
      context: any
    ) => {
      const user = checkAuth(context);

      if (!user) {
        throw new GraphQLError(`Invalid User`, {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      try {
        const updatedOrder = await Order.findByIdAndUpdate(args.id, {
          $set: args.input,
        });

        return updatedOrder;
      } catch (err) {
        console.log(err);
      }
    }, */
  },
};

export default Order_Mutation;
