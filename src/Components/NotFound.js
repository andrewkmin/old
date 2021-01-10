import { Box, Button, Center, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Homepage" />
        <title>Page Not Found</title>
      </Helmet>
      <Box>
        <Center>
          <Text fontSize="6xl">404</Text>
        </Center>
        <Center>
          <Text fontSize="5xl">Page not found</Text>
        </Center>
        <Center mt={5}>
          <Button as={Link} to="/" colorScheme="teal">
            Go Back Home
          </Button>
        </Center>
      </Box>
    </>
  );
};

export default NotFound;
