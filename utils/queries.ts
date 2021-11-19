import { gql, useQuery } from "@apollo/client";

export const VIEWER_QUERY = gql`
  query ViewerQuery {
    viewer {
      userId
      email
      iv
    }
  }
`;

export const ACCOUNTS_QUERY = gql`
  query AccountsQuery($userId: ID!) {
    accounts(userId: $userId) {
      accountId
      url
      username
      hash
    }
  }
`;
