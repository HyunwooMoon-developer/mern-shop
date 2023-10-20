import { GraphQLError } from 'graphql';
import checkAuth from '../../utils/checkAuth';
import Order from '../../models/OrderModel';

const Order_Mutation = {
  Mutation: {
    addOrder: async (
      _: any,
      args: { input: { [key: string]: any } },
      context: any
    ) => {
      const user = checkAuth(context);

      if (!user) {
        throw new GraphQLError(`Invalid User`, {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const newOrder = new Order(args.input);

      try {
        const savedOrder = await newOrder.save();

        return savedOrder;
      } catch (err) {
        console.log(err);
      }
    },
    updateOrder: async (
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
    },
  },
};

export default Order_Mutation;
