import {
  InputGroup,
  InputLeftElement,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { MdEmail } from "react-icons/md";

const EmailInput = () => (
  <FormControl isRequired>
    <FormLabel>Email</FormLabel>
    <InputGroup>
      <InputLeftElement>
        <MdEmail color={"gray"} />
      </InputLeftElement>
      <Input
        required
        size={"md"}
        type={"email"}
        name={"email"}
        placeholder={"Email"}
      />
    </InputGroup>
  </FormControl>
);

export default EmailInput;
