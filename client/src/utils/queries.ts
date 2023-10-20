import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query getCategories {
    getCategories {
      id
      name
    }
  }
`;

export const GET_PRODUCTS = gql`
  query getProducts($category: ID, $name: String) {
    getProducts(category: $category, name: $name) {
      id
      name
      desc
      image
      price
      quantity
      size
      color
      category {
        id
        name
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query getProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      desc
      image
      price
      quantity
      size
      color
      category {
        id
        name
      }
    }
  }
`;

export const GET_CART = gql`
  query getCart {
    getCart {
      id
      user
      products {
        product {
          id
          name
        }
        size
        color
        quantity
      }
    }
  }
`;
