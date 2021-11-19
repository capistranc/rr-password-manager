import { useEffect } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { gql, useQuery } from "@apollo/client";
import {
  GetStaticProps,
  GetStaticPaths,
  GetServerSideProps,
  NextPageContext,
  NextApiRequest,
} from "next";
import { getLoginSession } from "../lib/auth";
import Iron from "@hapi/iron";
import { getAccounts } from "../lib/accounts";
import {
  Flex,
  Heading,
  InputGroup,
  Input,
  chakra,
  Button,
  Link,
  Stack,
  FormLabel,
  FormControl,
  Box,
} from "@chakra-ui/react";

const AccountsQuery = gql`
  query AccountsQuery($userId: ID!) {
    accounts(userId: $userId) {
      accountId
      url
      username
      hash
    }
  }
`;

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      userId
      email
      iv
    }
  }
`;

import { PasswordTable } from "../components/tables/PasswordTable";

const Index = ({ accounts }) => {
  const router = useRouter();

  const { data, loading, error } = useQuery(ViewerQuery);
  const viewer = data?.viewer;
  const shouldRedirect = !(loading || error || viewer);

  useEffect(() => {
    if (shouldRedirect) {
      router.push("/signin");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRedirect]);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  if (error) {
    return <p>ERROR FROM useQuery{error.message}</p>;
  }

  if (viewer) {
    return (
      <Box>
        You're signed in as {viewer.email} goto{" "}
        <NextLink href="/about">
          <a>about</a>
        </NextLink>
        page. or{" "}
        <NextLink href="/signout">
          <a>signout</a>
        </NextLink>
        <PasswordTable accounts={accounts} />
      </Box>
    );
  }

  return <p>Loading...</p>;
};

//OK I cheated, I skipped graphQL here..
//This will slow down the caching in graphql but this whole thing was a learning experiment anyways
export async function getServerSideProps(context: NextPageContext) {
  const session = await getLoginSession(context.req as NextApiRequest);

  if (!session) return;

  const { userId, iv } = session;

  let accounts = await getAccounts({ userId });

  accounts = await Promise.all(
    accounts.map(async (a) => {
      const password = await Iron.unseal(a.hash, iv, Iron.defaults);

      return {
        ...a,
        password,
      };
    }),
  );

  return {
    props: { accounts }, // will be passed to the page component as props
  };
}

export default Index;
