import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";

// Input component for last name
const LastNameInput = () => (
  <Box>
    <FormControl isRequired>
      <FormLabel>Last Name</FormLabel>
      <Input
        required
        type="text"
        name="lastName"
        placeholder="Last Name"
        size="md"
      />
    </FormControl>
  </Box>
);

export default LastNameInput;
