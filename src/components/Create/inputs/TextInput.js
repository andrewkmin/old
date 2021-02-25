import { Center, FormControl, Input } from "@chakra-ui/react";

const TextInput = ({ handleInput }) => {
  return (
    <FormControl>
      <Center>
        <Input
          borderRadius={"xl"}
          variant={"outline"}
          onChange={(event) => handleInput(event)}
          placeholder={"Write something..."}
          name={"text"}
          size={"md"}
          // w={"full"}
        />
      </Center>
    </FormControl>
  );
};

export default TextInput;
