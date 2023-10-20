import { Schema, model } from 'mongoose';
import CartInterface from '../interfaces/CartInterface';

const CartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    products: [
      {
        product: {
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
  {
    timestamps: true,
    versionKey: false,
    collection: 'Cart',
  }
);

const Cart = model<CartInterface>('Cart', CartSchema);

export default Cart;
