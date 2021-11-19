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

type Account = {
  accountId?: string;
  url?: string;
  username?: string;
  password?: string;
  userId: string;
};

type PropData = {
  account: Account;
};

export const AccountForm = ({
  propData = null,
  onSubmit,
}: {
  propData: PropData;
  onSubmit: any;
}) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const { url, username, accountId, userId, password } = propData?.account;

  return (
    <>
      <chakra.form
        id="account-form"
        onSubmit={handleSubmit(onSubmit)}
        borderRadius="4px"
        m="0 auto"
        p="12"
        maxWidth="36rem"
        align="center"
      >
        <Stack spacing="4" align="center">
          <Input display="none" value={userId} {...register("userId")} />
          <Input
            display="none"
            defaultValue={accountId}
            {...register("accountId")}
          />
          <FormControl isRequired isInvalid={errors.email}>
            <FormLabel>URL: </FormLabel>
            <InputGroup>
              <Input
                id="url"
                type="url"
                borderColor="gray.500"
                placeholder="https://localhost:3000/"
                defaultValue={url}
                {...register("url")}
              />
            </InputGroup>
            <FormErrorMessage display="inline">
              {errors?.url?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={errors.email}>
            <FormLabel>Username: </FormLabel>
            <InputGroup>
              <Input
                id="username"
                type="username"
                borderColor="gray.500"
                placeholder="roundrobin"
                defaultValue={username}
                {...register("username")}
              />
            </InputGroup>
            <FormErrorMessage display="inline">
              {errors?.username?.message}
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
                defaultValue={password}
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
            Submit
          </Button>
        </Stack>
      </chakra.form>
    </>
  );
};

export default AccountForm;
