import { GraphQLError } from 'graphql';
import checkAuth from '../../utils/checkAuth.js';
import Product from '../../models/ProductModel.js';

const Product_Mutation = {
  Mutation: {
    addProduct: async (
      _: any,
      args: { input: { [key: string]: any } },
      context: any
    ) => {
      const user = checkAuth(context);

      if (!user) {
        throw new GraphQLError(`Invalid User`, {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      try {
        const newProduct = new Product(args.input);

        const savedProduct = await newProduct.save();

        return savedProduct;
      } catch (err) {
        console.log(err);
      }
    },
    updateProduct: async (
      _: any,
      args: { id: string; input: { [key: string]: any } },
      context: any
    ) => {
      const user = checkAuth(context);

      if (!user) {
        throw new GraphQLError(`Invalid User`, {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      try {
        const updatedProduct = await Product.findByIdAndUpdate(
          args.id,
          {
            $set: args.input,
          },
          { new: true }
        );

        return updatedProduct;
      } catch (err) {
        console.log(err);
      }
    },
    deleteProduct: async (_: any, args: { id: string }, context: any) => {
      const user = checkAuth(context);

      if (!user) {
        throw new GraphQLError(`Invalid User`, {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      try {
        const product = await Product.findById(args.id);

        if (product) {
          await Product.findByIdAndDelete(args.id);

          return product;
        } else {
          throw new Error('Product is not exists');
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export default Product_Mutation;
