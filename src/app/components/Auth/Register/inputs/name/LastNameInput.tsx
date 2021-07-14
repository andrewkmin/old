import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";

// Input component for last name
const LastNameInput = () => (
  <Box>
    <FormControl>
      <FormLabel>Last Name</FormLabel>
      <Input
        required
        size={"lg"}
        type={"text"}
        name={"lastName"}
        placeholder={"Last Name"}
      />
    </FormControl>
  </Box>
);

export default LastNameInput;
