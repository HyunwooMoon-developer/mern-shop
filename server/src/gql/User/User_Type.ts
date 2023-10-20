import { gql } from 'graphql-tag';

const User_Type = gql`
  type User {
    id: ID!
    username: String
    email: String
    password: String
    isAdmin: Boolean
  }

  type Auth {
    token: ID
    user: User
  }

  type Mutation {
    login(username: String!, password: String!): Auth!
    register(input: RegisterInput!): SuccessResult
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    isAdmin: Boolean
  }
`;

export default User_Type;
