import {
  Center,
  FormControl,
  Input,
  // Textarea
} from "@chakra-ui/react";

type TextInputProps = {
  handleInput: Function;
};

// Input for post creation
const TextInput = ({ handleInput }: TextInputProps) => (
  <FormControl>
    <Center>
      <Input
        size={"md"}
        name={"text"}
        rounded={"full"}
        // resize={"none"}
        boxShadow={"sm"}
        variant={"outline"}
        placeholder={"Write something..."}
        onChange={(event) => handleInput(event)}
        // focusBorderColor={useColorModeValue("teal.500", "teal.300")}
      />
    </Center>
  </FormControl>
);

export default TextInput;
