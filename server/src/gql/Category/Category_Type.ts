import { gql } from 'graphql-tag';

const Category_Type = gql`
  type Category {
    id: ID!
    name: String
  }

  type Query {
    getCategories: [Category]
  }
`;

export default Category_Type;
