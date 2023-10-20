import { Schema, model } from 'mongoose';
import ProductInterface from '../interfaces/ProductInterface';

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
      trim: true,
    },
    desc: {
      type: String,
      required: [true, 'Description is required'],
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0.99,
    },
    quantity: {
      type: Number,
      min: 0,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    size: {
      type: Array,
    },
    color: {
      type: Array,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'Product',
  }
);

const Product = model<ProductInterface>('Product', ProductSchema);

export default Product;
