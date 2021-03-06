import { useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { gql } from "@apollo/client";
import { useMutation, useApolloClient } from "@apollo/client";

import { useForm } from "react-hook-form";
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
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";

import { SIGNIN_MUTATION } from "../utils/mutations";

function SignIn() {
  const client = useApolloClient();
  const [signIn] = useMutation(SIGNIN_MUTATION, {
    onError: function ({ graphQLErrors, networkError }) {
      if (graphQLErrors) {
        const {
          extensions: { msg, field },
        } = graphQLErrors[0];
        throw { msg, field };
      }
    },
  });

  const router = useRouter();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit({ email, password }) {
    try {
      await client.resetStore();
      const { data } = await signIn({
        variables: {
          email,
          password,
        },
      });

      if (data.signIn.user) {
        await router.push("/");
      }
    } catch (error) {
      setError("password", {
        type: "manual",
        message: "User/Password combination does not exist",
      });
    }
  }

  return (
    <>
      <chakra.form
        id="contact-form"
        onSubmit={handleSubmit(onSubmit)}
        boxShadow="0 0 29px 0 rgb(0 0 0 / 9%)"
        border={"4px dashedArray 12,5"}
        borderRadius="4px"
        m="0 auto"
        p="12"
        mt="8"
        maxWidth="36rem"
        align="center"
      >
        <Box>
          <Heading d="inline">RR </Heading>
          <Heading color="red.600" d="inline">
            Pass
          </Heading>
        </Box>

        <Flex
          justify="space-between"
          borderBottom="2px solid"
          borderColor="rgba(0.4,0.4,0.4,0.1)"
          my="4"
        >
          <Text fontSize="xl"> LOG IN </Text>
          <Box>
            or{" "}
            <NextLink href="/signup" passHref>
              <Link color="blue.500">CREATE AN ACCOUNT</Link>
            </NextLink>
          </Box>
        </Flex>

        <Stack spacing="4" align="center">
          <FormControl isRequired isInvalid={errors.email}>
            <FormLabel>Email: </FormLabel>
            <InputGroup>
              <Input
                id="email"
                type="email"
                borderColor="gray.500"
                placeholder="foobar@gmail.com"
                {...register("email", {
                  minLength: {
                    value: 8,
                    message: "Minimum length should be 4",
                  },
                  pattern: {
                    message:
                      "Email must be formatted properly: JackieChan@gmail.com",
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  },
                })}
              />
            </InputGroup>
            <FormErrorMessage display="inline">
              {errors?.email?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={errors.password}>
            <FormLabel>Password: </FormLabel>
            <InputGroup>
              <Input
                id="password"
                type="password"
                borderColor="gray.500"
                placeholder="Enter your password"
                {...register("password", {
                  minLength: {
                    value: 6,
                    message: "Minimum length should be 6",
                  },
                })}
              />
            </InputGroup>
            <FormErrorMessage display="inline">
              {errors?.password?.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            variant="solid"
            bg="red.600"
            color="white"
            width="70%"
            borderRadius="full"
            isLoading={isSubmitting}
            loadingText="Sending..."
          >
            LOG IN
          </Button>
        </Stack>
      </chakra.form>
    </>
  );
}

export default SignIn;
