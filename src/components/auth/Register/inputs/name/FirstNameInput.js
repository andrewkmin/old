import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";

const FirstNameInput = () => {
  return (
    <Box me={1}>
      <FormControl isRequired>
        <FormLabel>First Name</FormLabel>
        <Input
          required
          type={"text"}
          name={"firstName"}
          placeholder={"First Name"}
          size={"md"}
        />
      </FormControl>
    </Box>
  );
};

export default FirstNameInput;
