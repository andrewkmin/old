import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { MdLock } from "react-icons/md";

const PasswordInput = () => {
  return (
    <FormControl isRequired>
      <FormLabel>Password</FormLabel>
      <InputGroup>
        <InputLeftElement>
          <MdLock color="gray" />
        </InputLeftElement>
        <Input
          required
          type={"password"}
          name={"password"}
          placeholder={"Password"}
          size={"md"}
        />
      </InputGroup>
    </FormControl>
  );
};

export default PasswordInput;
