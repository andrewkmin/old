import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";

// Input component for first name
const FirstNameInput = () => (
  <Box>
    <FormControl>
      <FormLabel>First Name</FormLabel>
      <Input
        required
        type={"text"}
        name={"firstName"}
        placeholder={"First Name"}
      />
    </FormControl>
  </Box>
);

export default FirstNameInput;
