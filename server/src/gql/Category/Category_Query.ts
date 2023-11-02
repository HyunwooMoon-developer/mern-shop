import Category from '../../models/CategoryModel.js';

const Category_Query = {
  Query: {
    getCategories: async (_: any, args: any) => {
      return await Category.find();
    },
  },
};

export default Category_Query;
