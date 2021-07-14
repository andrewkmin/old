import { FormControl, FormLabel, InputGroup, Input } from "@chakra-ui/react";

const PasswordInput = () => (
  <FormControl>
    <FormLabel>Password</FormLabel>
    <InputGroup>
      <Input
        required
        size={"lg"}
        minLength={8}
        type={"password"}
        name={"password"}
        placeholder={"Password"}
      />
    </InputGroup>
  </FormControl>
);

export default PasswordInput;
