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
import { Box } from "@chakra-ui/react";

import { VIEWER_QUERY } from "../utils/queries";

import { PasswordTable } from "../components/tables/PasswordTable";

const Index = ({ accounts }) => {
  const router = useRouter();

  const { data, loading, error } = useQuery(VIEWER_QUERY);
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
        You're signed in as {viewer.email} {viewer.userId} goto{" "}
        <NextLink href="/about">
          <a>about</a>
        </NextLink>
        page. or{" "}
        <NextLink href="/signout">
          <a>signout</a>
        </NextLink>
        <PasswordTable userId={viewer.userId} accounts={accounts} />
      </Box>
    );
  }

  return <p>Loading...</p>;
};

//OK I cheated, I skipped graphQL here..
//This will slow down the caching in graphql but this whole thing was a learning experiment anyways
export async function getServerSideProps(context: NextPageContext) {
  try {
    const session = await getLoginSession(context.req as NextApiRequest);

    if (!session) return { props: { accounts: [] } };

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
  } catch (e) {
    console.log(e);
  }
}

export default Index;
