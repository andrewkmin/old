import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";

const LastNameInput = () => {
  return (
    <Box ms={1}>
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
};

export default LastNameInput;
