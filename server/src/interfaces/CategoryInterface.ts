import { Document } from 'mongoose';

interface CategoryInterface extends Document {
  name: string;
}

export default CategoryInterface;
