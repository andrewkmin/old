import {
  Text,
  Box,
  Center,
  useDisclosure,
  Container,
  Slide,
  Link,
} from "@chakra-ui/react";
import Login from "../Login";
import Register from "../Register";
import { Helmet } from "react-helmet-async";

const Welcome = () => {
  const { isOpen: welcomeInfoIsOpen } = useDisclosure({ isOpen: true });
  const {
    isOpen: registrationIsOpen,
    onOpen: registrationOnOpen,
    onClose: registrationOnClose,
  } = useDisclosure();

  return (
    <>
      <Helmet>
        <meta name="description" content="Welcome to Usocial" />
        <title>Welcome to Usocial</title>
      </Helmet>
      <Box overflow="hidden">
        <Container overflow="hidden">
          <Center>
            <Login registrationOnOpen={registrationOnOpen} />
            <Register
              registrationIsOpen={registrationIsOpen}
              registrationOnClose={registrationOnClose}
              registrationOnOpen={registrationOnOpen}
            />
          </Center>
        </Container>
      </Box>

      <Slide direction="bottom" in={welcomeInfoIsOpen}>
        <Box
          p="40px"
          color="white"
          mt="4"
          bg="teal.500"
          rounded="md"
          shadow="md"
        >
          <Center>
            <Text fontWeight="semibold">Welcome to Usocial!</Text>
          </Center>
          <Center>
            <Text fontWeight="semibold">
              We highly encourage you reading our{" "}
              <Link textDecor="underline">Terms of Service</Link> and{" "}
              <Link textDecor="underline">Privacy Policy</Link>
            </Text>
          </Center>
        </Box>
      </Slide>
    </>
  );
};

export default Welcome;
