import { Document } from 'mongoose';
import CartInterface from './CartInterface';

interface OrderInterface extends Document {
  orderList: CartInterface;
  amount: number;
  address: {
    [key: string]: string;
  };
  status: string;
}

export default OrderInterface;
