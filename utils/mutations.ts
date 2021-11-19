import { gql } from "@apollo/client";

export const SIGNOUT_MUTATION = gql`
  mutation SignOutMutation {
    signOut
  }
`;

export const SIGNIN_MUTATION = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      user {
        userId
        email
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation SignUpMutation($email: String!, $password: String!) {
    signUp(input: { email: $email, password: $password }) {
      user {
        userId
        email
      }
    }
  }
`;

export const DELETE_ACCOUNT_MUTATION = gql`
  mutation DeleteAccountMutation($accountId: ID!) {
    deleteAccount(input: { accountId: $accountId })
  }
`;

export const ADD_ACCOUNT_MUTATION = gql`
  mutation addAccount(
    $userId: ID!
    $username: String!
    $password: String!
    $url: String!
  ) {
    addAccount(
      input: {
        userId: $userId
        username: $username
        password: $password
        url: $url
      }
    ) {
      accountId
    }
  }
`;

export const UPDATE_ACCOUNT_MUTATION = gql`
  mutation updateAccount(
    $userId: ID!
    $accountId: ID!
    $username: String!
    $password: String!
    $url: String!
  ) {
    updateAccount(
      input: {
        userId: $userId
        accountId: $accountId
        username: $username
        password: $password
        url: $url
      }
    )
  }
`;
