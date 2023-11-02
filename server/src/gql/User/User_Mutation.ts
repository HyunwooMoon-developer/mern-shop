import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import {
  generateToken,
  validateLoginInput,
  validateRegisterInput,
} from '../../utils/validateUser.js';
import User from '../../models/UserModel.js';
import Cart from '../../models/CartModel.js';

const User_Mutation = {
  Mutation: {
    register: async (
      _: any,
      args: {
        input: {
          username: string;
          email: string;
          password: string;
          isAdmin?: boolean;
        };
      }
    ) => {
      let { username, email, password } = args.input;

      const errors = validateRegisterInput(username, email, password);

      if (Object.keys(errors).length > 0) {
        throw new GraphQLError('Error Exsits', {
          extensions: {
            code: ApolloServerErrorCode.BAD_USER_INPUT,
            argumentName: Object.keys(errors)[0],
          },
        });
      }

      const existUser = await User.findOne({ username });

      if (existUser) {
        throw new GraphQLError('Username is taken', {
          extensions: {
            code: ApolloServerErrorCode.BAD_USER_INPUT,
            argumentName: 'username',
          },
        });
      }

      const existEmail = await User.findOne({ email });

      if (existEmail) {
        throw new GraphQLError('Email is taken', {
          extensions: {
            code: ApolloServerErrorCode.BAD_USER_INPUT,
            argumentName: 'email',
          },
        });
      }

      const newUser = new User(args.input);

      const res = await newUser.save();

      if (res) {
        return {
          success: true,
        };
      } else {
        return {
          success: false,
        };
      }
    },
    login: async (_: any, args: { username: string; password: string }) => {
      const { username, password } = args;

      const errors = validateLoginInput(username, password);

      if (Object.keys(errors).length > 0) {
        throw new GraphQLError('Error Exsits', {
          extensions: {
            code: ApolloServerErrorCode.BAD_USER_INPUT,
            argumentName: Object.keys(errors)[0],
          },
        });
      }

      const user = await User.findOne({ username });

      if (!user) {
        throw new GraphQLError('Incorrect credentials', {
          extensions: {
            code: ApolloServerErrorCode.BAD_USER_INPUT,
            argumentName: 'username',
          },
        });
      }

      const checkPW = await user.comparePassword(password);

      if (!checkPW) {
        throw new GraphQLError('Invalid Password', {
          extensions: {
            code: ApolloServerErrorCode.BAD_USER_INPUT,
            argumentName: 'password',
          },
        });
      }

      const token = generateToken(user);

      if (token) {
        const userCart = await Cart.findOne({ user: user.id });

        if (!userCart) {
          const newCart = new Cart({
            user: user.id,
          });

          await newCart.save();
        }
      }

      return {
        token,
        user,
      };
    },
  },
};

export default User_Mutation;
