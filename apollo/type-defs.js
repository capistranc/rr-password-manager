import { gql } from "@apollo/client";

export const typeDefs = gql`
  type User {
    userId: ID!
    email: String!
    createdAt: Int!
    iv: String!
  }

  type Account {
    accountId: ID!
    url: String!
    username: String!
    hash: String!
  }

  input NewAccountInput {
    userId: ID!
    url: String!
    username: String!
    password: String!
  }

  input UpdateAccountInput {
    accountId: ID!
    url: String!
    username: String!
    password: String!
  }

  input DeleteAccountInput {
    accountId: ID!
  }

  input SignUpInput {
    email: String!
    password: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  type SignUpPayload {
    user: User!
  }

  type SignInPayload {
    user: User!
  }

  type NewAccountPayload {
    accountId: String!
  }

  type Query {
    user(userId: ID!): User!
    users: [User]!
    viewer: User
    accounts(userId: ID!): [Account]!
  }

  type Mutation {
    signUp(input: SignUpInput!): SignUpPayload!
    signIn(input: SignInInput!): SignInPayload!
    addAccount(input: NewAccountInput!): NewAccountPayload!
    updateAccount(input: UpdateAccountInput!): Boolean!
    deleteAccount(input: DeleteAccountInput!): Boolean!
    signOut: Boolean!
  }
`;
