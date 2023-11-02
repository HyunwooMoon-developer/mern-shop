import { Schema, model } from 'mongoose';
import CategoryInterface from '../interfaces/CategoryInterface.js';

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    collection: 'Category',
    versionKey: false,
  }
);

const Category = model<CategoryInterface>('Category', CategorySchema);

export default Category;
