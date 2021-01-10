import _axios from "../helpers/_axios";
import isLoggedIn from "../helpers/isLoggedIn";

import {
  Input,
  Text,
  Box,
  Button,
  Stack,
  Center,
  FormControl,
  FormErrorMessage,
  InputGroup,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormLabel,
  Flex,
  Container,
  Slide,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";

const Welcome = () => {
  const History = useHistory();
  const [isLoading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const Credentials = {};

  const submit = async () => {
    if (Credentials.email.length !== 0 && Credentials.password.length !== 0) {
      setLoading(true);
      const { data } = await _axios.post("/auth/login", Credentials);
      if (!data.error) {
        localStorage.setItem("token", data.token);
        const loggedInStatus = await isLoggedIn();
        if (loggedInStatus === true) {
          return History.push("/");
        }
      }
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Helmet>
        <meta name="description" content="Welcome to Usocial" />
        <title>Welcome to Usocial</title>
      </Helmet>
      <Box overflow="hidden">
        <Container overflow="hidden">
          <Center>
            <Box pos="absolute" top="50" height="full" width="full">
              <Box>
                <Center>
                  <Text fontSize="6xl" fontWeight="bold" color="teal.500">
                    Usocial
                  </Text>
                </Center>

                <Container>
                  <Center>
                    <Stack p={7} spacing={3} boxSize="sm">
                      <FormControl isRequired>
                        <InputGroup>
                          <Input
                            placeholder="Email"
                            size="md"
                            name="email"
                            type="email"
                            onChange={(event) =>
                              (Credentials.email = event.target.value)
                            }
                            onKeyUp={(event) =>
                              (Credentials.email = event.target.value)
                            }
                          />
                        </InputGroup>
                        <FormErrorMessage></FormErrorMessage>
                      </FormControl>

                      <FormControl isRequired>
                        <Input
                          placeholder="Password"
                          size="md"
                          min={8}
                          name="password"
                          type="password"
                          onChange={(event) =>
                            (Credentials.password = event.target.value)
                          }
                          onKeyUp={(event) =>
                            (Credentials.password = event.target.value)
                          }
                        />
                        <FormErrorMessage></FormErrorMessage>
                      </FormControl>

                      <Button
                        _focusVisible={false}
                        _focus={false}
                        _focusWithin={false}
                        type="submit"
                        loadingText="Signing In"
                        m={1}
                        onClick={submit}
                        isLoading={isLoading}
                        colorScheme="blue"
                        size="md"
                      >
                        Log In
                      </Button>
                      <Divider />
                      <Center>
                        <Button
                          _focusVisible={false}
                          _focus={false}
                          _focusWithin={false}
                          onClick={onOpen}
                          m={1}
                          size="md"
                          colorScheme="teal"
                        >
                          Create New Account
                        </Button>
                      </Center>
                    </Stack>
                  </Center>
                </Container>
              </Box>
            </Box>

            <Box pos="fixed" bottom="0" p={5}>
              <Text fontSize="md" fontWeight="semibold" color="gray.600">
                Usocial &copy; 2021
              </Text>
            </Box>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
              <ModalOverlay />
              <ModalContent m={2}>
                <ModalHeader>
                  <Text color="gray.900">Sign Up</Text>
                </ModalHeader>
                <ModalCloseButton
                  _focusVisible={false}
                  _focus={false}
                  _focusWithin={false}
                />
                <ModalBody>
                  <Stack mt={4} spacing={4}>
                    <Flex>
                      <Box me={1}>
                        <FormControl isRequired>
                          <FormLabel>First Name</FormLabel>
                          <Input
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            size="md"
                          />
                        </FormControl>
                      </Box>

                      <Box ms={1}>
                        <FormControl isRequired>
                          <FormLabel>Last Name</FormLabel>
                          <Input
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            size="md"
                          />
                        </FormControl>
                      </Box>
                    </Flex>

                    <FormControl isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        size="md"
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Password</FormLabel>
                      <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        size="md"
                      />
                    </FormControl>

                    <Button
                      _focusVisible={false}
                      _focus={false}
                      _focusWithin={false}
                      colorScheme="teal"
                      mt={2}
                      mb={2}
                    >
                      Sign Up
                    </Button>
                  </Stack>
                </ModalBody>
              </ModalContent>
            </Modal>
          </Center>
        </Container>
      </Box>
    </>
  );
};

export default Welcome;
