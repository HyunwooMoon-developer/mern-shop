import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        email
        username
        isAdmin
      }
    }
  }
`;

export const REGISTER = gql`
  mutation register($input: RegisterInput!) {
    register(input: $input) {
      success
    }
  }
`;

export const UPDATE_CART = gql`
  mutation updateCart($id: ID!, $input: [CartInput]!) {
    updateCart(id: $id, input: $input) {
      success
    }
  }
`;

export const Add_Order = gql`
  mutation addOrder($input: OrderInput) {
    addOrder(input: $input) {
      success
    }
  }
`;
