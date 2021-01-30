import {
  Box,
  Button,
  Center,
  Container,
  Fade,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const FadeAnimationOn = useDisclosure({ isOpen: true });

  return (
    <>
      <Helmet>
        <meta name="description" content="Homepage" />
        <title>Page Not Found</title>
      </Helmet>
      <Box bgColor="teal.500" h="100vh">
        <Fade in={FadeAnimationOn}>
          <Container pt={20}>
            <Center>
              <Text color="white" fontSize="6xl" fontWeight="bold">
                404
              </Text>
            </Center>
            <Center>
              <Text color="white" fontSize="3xl" fontWeight="semibold">
                Page Not Found
              </Text>
            </Center>
            <Center mt={5}>
              <Button as={Link} to="/" colorScheme="red" size="lg">
                Return to the homepage
              </Button>
            </Center>
          </Container>
        </Fade>
      </Box>
    </>
  );
};

export default NotFound;
