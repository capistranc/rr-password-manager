import {
  Flex,
  Heading,
  Box,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tfoot,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";

import Iron from "@hapi/iron";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import { HiOutlineTrash, HiPlus, HiPencil } from "react-icons/hi";
import { PasswordField } from "../Fields/password";
import { useDisclosure } from "@chakra-ui/hooks";

export const PasswordForm = () => {};

import { AccountForm } from "../forms/AccountForm";
import {
  ADD_ACCOUNT_MUTATION,
  DELETE_ACCOUNT_MUTATION,
  UPDATE_ACCOUNT_MUTATION,
} from "../../utils/mutations";

export const PasswordTable = ({ userId, accounts }) => {
  const [addAccount] = useMutation(ADD_ACCOUNT_MUTATION);
  const [updateAccount] = useMutation(UPDATE_ACCOUNT_MUTATION);
  const router = useRouter();
  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function handleAdd({ url, username, password, userId }) {
    console.log("HANDLE ADD");
    try {
      console.log("HANDLE ADD");
      const { data } = await addAccount({
        variables: {
          userId,
          url,
          username,
          password,
        },
      });
      refreshData();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const DeleteButton = ({ accountId }) => {
    const [deleteAccount] = useMutation(DELETE_ACCOUNT_MUTATION);

    async function handleDelete() {
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
        onClick={() => handleDelete()}
        icon={<HiOutlineTrash />}
      />
    );
  };

  async function handleEdit({ accountId, url, username, password, userId }) {
    try {
      const { data } = await updateAccount({
        variables: {
          userId,
          accountId,
          url,
          username,
          password,
        },
      });
      refreshData();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const EditButton = ({ account }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    // console.log("editbutton", account);

    return (
      <>
        <IconButton
          aria-label="Edit Account Info"
          icon={<HiPencil />}
          onClick={onOpen}
        />

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Account Info</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <AccountForm propData={{ account }} onSubmit={handleEdit} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };

  const AddButton = ({ userId, ...props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    // console.log("editbutton", account);

    return (
      <Box {...props}>
        <IconButton
          aria-label="Add Account"
          icon={<HiPlus />}
          onClick={onOpen}
        />

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add a new Account</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <AccountForm
                propData={{ account: { userId } }}
                onSubmit={handleAdd}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    );
  };

  const TableRow = (account) => {
    const { url, username, password, accountId } = account;
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
            <EditButton account={account} />{" "}
            <DeleteButton accountId={accountId} />
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
      maxWidth="72rem"
      align="center"
    >
      <Flex mb="8" justify="center" position="relative">
        <Heading d="inline">RR </Heading>
        <Heading color="red.600" d="inline">
          Pass Manager
        </Heading>
        <AddButton
          userId={userId}
          justifySelf="flex-end"
          position="absolute"
          right="0"
          mr="8"
        />
      </Flex>

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
