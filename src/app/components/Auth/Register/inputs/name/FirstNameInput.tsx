import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";

// Input component for first name
const FirstNameInput = () => (
  <Box>
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

export default FirstNameInput;
