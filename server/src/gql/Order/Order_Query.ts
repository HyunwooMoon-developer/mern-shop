import { GraphQLError } from 'graphql';
import Order from '../../models/OrderModel.js';
import checkAuth from '../../utils/checkAuth.js';

const Order_Query = {
  Query: {
    getOrders: async (_: any, args: { user?: string }, context: any) => {
      const user = checkAuth(context);

      if (!user) {
        throw new GraphQLError(`Invalid User`, {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      let params: { [key: string]: { [key: string]: string } } = {};

      if (args.user) {
        params.orderList.user = args.user;
      }

      return await Order.find(params).populate('orderList');
    },
    getOrder: async (_: any, args: { id: string }, context: any) => {
      const user = checkAuth(context);

      if (!user) {
        throw new GraphQLError(`Invalid User`, {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      return await Order.findById(args.id).populate('orderList');
    },
  },
};

export default Order_Query;
