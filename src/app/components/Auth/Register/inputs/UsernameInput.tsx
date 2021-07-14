import { FormControl, FormLabel, Input, InputGroup } from "@chakra-ui/react";

const UsernameInput = () => {
  return (
    <FormControl>
      <FormLabel>Username</FormLabel>
      <InputGroup>
        <Input
          isRequired
          size={"lg"}
          name={"username"}
          placeholder={"Username"}
        />
      </InputGroup>
    </FormControl>
  );
};

export default UsernameInput;
