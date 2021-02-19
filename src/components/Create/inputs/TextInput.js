import { isMobile } from "react-device-detect";
import { FormControl, Input } from "@chakra-ui/react";

const TextInput = ({ handleInput }) => {
  return (
    <FormControl>
      <Input
        borderRadius={"full"}
        size={isMobile ? "sm" : "lg"}
        variant={"outline"}
        onChange={(event) => handleInput(event)}
        placeholder={"Write something..."}
        name={"text"}
      />
    </FormControl>
  );
};

export default TextInput;
