import { Center, FormControl, Input } from "@chakra-ui/react";

const TextInput = ({ handleInput }) => {
  return (
    <FormControl>
      <Center>
        <Input
          size={"md"}
          name={"text"}
          boxShadow={"sm"}
          borderRadius={"xl"}
          variant={"outline"}
          placeholder={"Write something..."}
          onChange={(event) => handleInput(event)}
        />
      </Center>
    </FormControl>
  );
};

export default TextInput;
