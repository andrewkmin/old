import { useColorModeValue } from "@chakra-ui/color-mode";
import { Center, FormControl, Input } from "@chakra-ui/react";

// The input for
const TextInput = ({ handleInput }) => {
  return (
    <FormControl>
      <Center>
        <Input
          size={"md"}
          name={"text"}
          boxShadow={"sm"}
          variant={"outline"}
          placeholder={"Write something..."}
          onChange={(event) => handleInput(event)}
          focusBorderColor={useColorModeValue("teal.500", "teal.300")}
        />
      </Center>
    </FormControl>
  );
};

export default TextInput;
