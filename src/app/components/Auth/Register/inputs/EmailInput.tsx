import {
  InputGroup,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";

const EmailInput = () => (
  <FormControl>
    <FormLabel>Email</FormLabel>
    <InputGroup>
      <Input
        required
        size={"lg"}
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
