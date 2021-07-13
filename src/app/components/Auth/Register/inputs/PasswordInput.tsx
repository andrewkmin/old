import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { MdLock } from "react-icons/md";

const PasswordInput = () => (
  <FormControl>
    <FormLabel>Password</FormLabel>
    <InputGroup>
      <InputLeftElement>
        <MdLock color="gray" />
      </InputLeftElement>
      <Input
        required
        size={"md"}
        minLength={8}
        type={"password"}
        name={"password"}
        placeholder={"Password"}
      />
    </InputGroup>
  </FormControl>
);

export default PasswordInput;
