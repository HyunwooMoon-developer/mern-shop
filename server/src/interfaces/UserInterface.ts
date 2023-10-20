import { Document } from 'mongoose';

interface UserInterface extends Document {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  comparePassword: (password: string) => boolean;
}

export default UserInterface;
