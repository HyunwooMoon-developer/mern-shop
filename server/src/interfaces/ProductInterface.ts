import { Document, Schema } from 'mongoose';

interface ProductInterface extends Document {
  name: string;
  desc: string;
  image: string;
  price: number;
  quantity: number;
  category: Schema.Types.ObjectId;
  size: string[];
  color: string[];
}

export default ProductInterface;
