import {
  Flex,
  Heading,
  chakra,
  Button,
  Link,
  Stack,
  FormLabel,
  FormControl,
  Box,
  Text,
  FormErrorMessage,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

import Iron from "@hapi/iron";
import NextLink from "next/link";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";

import { HiOutlineTrash, HiPlus, HiPencil } from "react-icons/hi";
import { PasswordField } from "../Fields/password";
import { useDisclosure } from "@chakra-ui/hooks";

export const PasswordForm = () => {};

const DELETE_QUERY = gql`
  mutation DeleteAccountMutation($accountId: ID!) {
    deleteAccount(input: { accountId: $accountId })
  }
`;

import { AccountForm } from "../forms/AccountForm";

export const PasswordTable = ({ accounts }) => {
  const router = useRouter();
  // Call this function whenever you want to
  // refresh props!
  const { isOpen, onOpen, onClose } = useDisclosure();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const DeleteButton = ({ accountId }) => {
    const [deleteAccount] = useMutation(DELETE_QUERY);

    async function handleSubmit() {
      try {
        const ret = await deleteAccount({
          variables: {
            accountId,
          },
        });
        refreshData();
      } catch (e) {
        console.log(e);
      }
    }

    return (
      <IconButton
        aria-label="Delete Account"
        onClick={() => handleSubmit()}
        icon={<HiOutlineTrash />}
      />
    );
  };

  const EditButton = ({}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <>
        <IconButton
          aria-label="Edit Account Info"
          icon={<HiPencil />}
          onClick={onOpen}
        ></IconButton>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Account Info</ModalHeader>
            <ModalCloseButton />
            <ModalBody>"TEST"</ModalBody>

            <ModalFooter>
              <Flex justify="space-between">
                <Button colorScheme="gray" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="ghost" colorScheme="blue">
                  Submit
                </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };

  const TableRow = ({ url, username, password, accountId }) => {
    return (
      <Tr>
        <Td>
          <NextLink href={url}>{url}</NextLink>
        </Td>
        <Td> {username}</Td>
        <Td>
          <PasswordField>{password}</PasswordField>
        </Td>
        <Td>
          <Flex>
            <DeleteButton accountId={accountId} /> <EditButton />
          </Flex>
        </Td>
      </Tr>
    );
  };

  return (
    <Box
      boxShadow="0 0 29px 0 rgb(0 0 0 / 9%)"
      border={"4px dashedArray 12,5"}
      borderRadius="4px"
      m="0 auto"
      mt="8"
      p="12"
      maxWidth="52rem"
      align="center"
    >
      <Table>
        <Thead>
          <Tr>
            <Th>URL</Th>
            <Th>Account</Th>
            <Th>Password</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>

        <Tbody>
          {accounts.map((rowData, i) => {
            return <TableRow key={i} {...rowData} />;
          })}
        </Tbody>
      </Table>
    </Box>
  );
};
