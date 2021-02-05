import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Center, Text } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Box p={10}>
      <Center m={1}>
        <Text fontSize="6xl" fontWeight="bold">
          404
        </Text>
      </Center>

      <Center m={1}>
        <Button size="sm" as={Link} to="/" colorScheme="red">
          Return to the homepage
        </Button>
      </Center>
    </Box>
  );
};

export default NotFound;
