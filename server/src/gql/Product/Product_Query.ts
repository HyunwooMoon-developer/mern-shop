import Product from '../../models/ProductModel';

const Product_Query = {
  Query: {
    getProducts: async (_: any, args: { category?: string; name?: string }) => {
      const { category, name } = args;
      let params: { [key: string]: string | { [key: string]: any } } = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
          $options: 'i',
        };
      }

      return await Product.find(params).populate('category');
    },
    getProduct: async (_: any, args: { id: string }) => {
      return await Product.findById(args.id).populate('category');
    },
  },
};

export default Product_Query;
