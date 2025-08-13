import { gql } from "apollo-server-express";

const authTypesDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
  }
  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
    getUserInfo: User!
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    updatePassword(oldPassword: String!, newPassword: String!): Boolean!
  }
`;

export default authTypesDefs;
