import { useEffect } from "react";
import { useRouter } from "next/router";
import { gql, useMutation, useApolloClient } from "@apollo/client";

import { SIGNOUT_MUTATION } from "../utils/mutations";

function SignOut() {
  const client = useApolloClient();
  const router = useRouter();
  const [signOut] = useMutation(SIGNOUT_MUTATION);

  useEffect(() => {
    signOut().then(() => {
      client.resetStore().then(() => {
        router.push("/signin");
      });
    });
  }, [signOut, router, client]);

  return <p>Signing out...</p>;
}

export default SignOut;
