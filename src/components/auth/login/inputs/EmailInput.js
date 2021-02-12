import {
  Input,
  FormControl,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { MdEmail } from "react-icons/md";
import { isMobile } from "react-device-detect";

const EmailInput = () => {
  return (
    <FormControl ps={isMobile ? 5 : null} pe={isMobile ? 5 : null}>
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
