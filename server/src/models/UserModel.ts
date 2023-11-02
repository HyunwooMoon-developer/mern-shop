import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import UserInterface from '../interfaces/UserInterface.js';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: [true, 'Username already in use'],
      required: [true, 'Username is required'],
    },
    password: {
      type: String,
      required: true,
      maxlength: [60, 'Password must less or equal than 60 character'],
      minlength: [6, 'Password must greater or equal than 6 characters'],
    },
    email: {
      type: String,
      unique: [true, 'Email already in use'],
      required: [true, 'Email is required'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: 'User',
    versionKey: false,
  }
);

UserSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }

  next();
});

UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const User = model<UserInterface>('User', UserSchema);

export default User;
