import {
  InputGroup,
  InputLeftElement,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import { MdEmail } from "react-icons/md";

const EmailInput = () => (
  <FormControl>
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
    <FormHelperText>
      We'll use this address to send you a verification email
    </FormHelperText>
  </FormControl>
);

export default EmailInput;
