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
        boxShadow={"sm"}
        variant={"outline"}
        placeholder={"Write something..."}
        onChange={(event) => handleInput(event)}
      />
    </Center>
  </FormControl>
);

export default TextInput;
