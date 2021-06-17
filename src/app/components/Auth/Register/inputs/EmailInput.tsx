import {
  InputGroup,
  InputLeftElement,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { MdEmail } from "react-icons/md";

const EmailInput = () => {
  return (
    <FormControl isRequired>
      <FormLabel>Email</FormLabel>
      <InputGroup>
        <InputLeftElement>
          <MdEmail color="gray" />
        </InputLeftElement>
        <Input
          required
          type={"email"}
          name={"email"}
          placeholder={"Email"}
          size={"md"}
        />
      </InputGroup>
    </FormControl>
  );
};

export default EmailInput;
