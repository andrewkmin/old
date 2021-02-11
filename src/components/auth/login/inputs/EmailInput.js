import {
  Input,
  FormControl,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { MdEmail } from "react-icons/md";

const EmailInput = () => {
  return (
    <FormControl>
      <InputGroup>
        <InputLeftElement>
          <MdEmail color={"gray"} />
        </InputLeftElement>
        <Input
          required
          placeholder={"Email"}
          size={"md"}
          name={"email"}
          type={"email"}
        />
      </InputGroup>
    </FormControl>
  );
};

export default EmailInput;
