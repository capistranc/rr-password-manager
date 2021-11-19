import { useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { NextPage } from "next";
import { gql, useMutation } from "@apollo/client";

import { useForm } from "react-hook-form";
import {
  Flex,
  Heading,
  InputGroup,
  InputRightElement,
  Input,
  chakra,
  Button,
  Link,
  Spacer,
  Textarea,
  Stack,
  FormLabel,
  FormControl,
  Box,
  Text,
  useToast,
  HTMLChakraProps,
  FormErrorMessage,
  useColorMode,
} from "@chakra-ui/react";

import { SIGNUP_MUTATION } from "../utils/mutations";

const SignUp: NextPage = () => {
  const [signUp] = useMutation(SIGNUP_MUTATION, {
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
  const toast = useToast();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit({ email, password, confirmPassword }) {
    try {
      if (confirmPassword != password) {
        throw { msg: "Passwords must Match", field: "confirmPassword" };
      }
      const ret = await signUp({
        variables: {
          email,
          password,
        },
      });

      toast({
        title: `Created account: ${email}!`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      router.push("/");
    } catch (e) {
      if (!e.msg || !e.field) {
        setError("confirmPassword", {
          type: "manual",
          message: "Unknown Error",
        });
      } else {
        setError(e.field, {
          type: "manual",
          message: e.msg,
        });
      }
    }
  }

  return (
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
        <Text fontSize="xl"> SIGN UP</Text>
        <Box>
          {" "}
          or{" "}
          <NextLink href="/signin" passHref>
            <Link color="blue.500">SIGN IN</Link>
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

        <FormControl isRequired isInvalid={errors.confirmPassword}>
          <FormLabel>Re-Enter password: </FormLabel>
          <InputGroup>
            <Input
              id="confirmPassword"
              type="password"
              borderColor="gray.500"
              placeholder="Enter your password"
              {...register("confirmPassword", {
                minLength: {
                  value: 6,
                  message: "Minimum length should be 6",
                },
              })}
            />
          </InputGroup>
          <FormErrorMessage display="inline">
            {errors?.confirmPassword?.message}
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
          Create Account
        </Button>
      </Stack>
    </chakra.form>
  );
};

export default SignUp;
