import { Document, Schema } from 'mongoose';

interface CartInterface extends Document {
  user: Schema.Types.ObjectId;
  products: {
    product: Schema.Types.ObjectId;
    color: string;
    size?: string;
    quantity?: number;
  }[];
}

export default CartInterface;
