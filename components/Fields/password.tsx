import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { useState } from "react";

export const PasswordField = ({ children }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup>
      <Input
        isReadOnly
        pr="4.5rem"
        type={show ? "text" : "password"}
        value={children}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
