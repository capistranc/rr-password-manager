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

import { useState } from "react";
export const PasswordInput = ({ ...props }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup>
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder="Enter password"
        {...props}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
