import { Schema, model } from 'mongoose';
import OrderInterface from '../interfaces/OrderInterface';

const OrderSchema = new Schema(
  {
    orderList: {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      products: [
        {
          id: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
          },
          color: {
            type: String,
          },
          size: {
            type: String,
          },
          quantity: {
            type: Number,
            min: 1,
          },
        },
      ],
    },
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      requried: true,
    },
    status: {
      type: String,
      default: 'pending',
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'Order',
  }
);

const Order = model<OrderInterface>('Order', OrderSchema);

export default Order;
