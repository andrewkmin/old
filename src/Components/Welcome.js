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
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { Form, Formik, ErrorMessage } from "formik";
import { sample } from "lodash";
import { Helmet } from "react-helmet-async";
import { useMemo, useState, useEffect } from "react";
import SignUpValidationSchema from "../models/SignUp";
import SignInValidationSchema from "../models/SignIn";

const Welcome = () => {
  const History = useHistory();
  const [displayQuote, setQuote] = useState();
  const [isMobile, setIsMobileState] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Credentials = {
    email: "",
    password: "",
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 425) {
        setIsMobileState(true);
      } else {
        setIsMobileState(false);
      }
    });

    if (window.innerWidth <= 425) {
      setIsMobileState(true);
    } else {
      setIsMobileState(false);
    }
  }, [setIsMobileState]);

  useMemo(() => {
    const Quotes = ["where the boss is you", "that doesn't eat your data"];
    setQuote(sample(Quotes));
  }, []);

  const submit = async () => {
    const { data } = await _axios.post("/auth/login", Credentials);
    if (!data.error) {
      localStorage.setItem("token", data.token);
      const loggedInStatus = await isLoggedIn();
      if (
        loggedInStatus === true &&
        Credentials.email.length !== 0 &&
        Credentials.password.length !== 0
      ) {
        History.push("/");
      }
    }
  };

  return (
    // TODO: Fix the error after the log in form submit
    <>
      <Helmet>
        <meta name="description" content="Welcome to Usocial" />
        <title>Welcome to Usocial</title>
      </Helmet>
      <Box>
        <Center>
          <Box
            overflow="hidden"
            width={isMobile ? null : "full"}
            height="full"
            p={isMobile ? 0 : 5}
          >
            <Box
              pos={isMobile ? null : "absolute"}
              left={isMobile ? null : "150"}
              mt={isMobile ? 20 : 10}
              p={isMobile ? 2 : 5}
            >
              {/* 
            // TODO: Improve the error handling of the forms 
            */}
              <Formik validationSchema={SignInValidationSchema}>
                <Form>
                  <Stack spacing={3} boxSize={isMobile ? "" : "sm"}>
                    {isMobile ? (
                      <Center>
                        <Text fontSize="xl" fontWeight="bold">
                          Log In
                        </Text>
                      </Center>
                    ) : (
                      ""
                    )}
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
                      <FormErrorMessage>
                        <ErrorMessage name="email" component="div" />
                      </FormErrorMessage>
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
                      <FormErrorMessage>
                        <ErrorMessage
                          name="password"
                          component="div"
                        ></ErrorMessage>
                      </FormErrorMessage>
                    </FormControl>

                    <Button
                      _focusVisible={false}
                      _focus={false}
                      _focusWithin={false}
                      type="submit"
                      loadingText="Signing In"
                      m={1}
                      onClick={submit}
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
                </Form>
              </Formik>
            </Box>

            {!isMobile ? (
              <>
                <Box pos="absolute" right="40" p={5} mt={10}>
                  <Text fontSize="3xl" fontWeight="semibold" color="gray.600">
                    A social network {displayQuote}
                  </Text>

                  <Center>
                    <Text fontSize="6xl" fontWeight="bold" color="teal.500">
                      Usocial
                    </Text>
                  </Center>
                </Box>
              </>
            ) : (
              ""
            )}
          </Box>
          <Box pos="fixed" bottom="0" p={5}>
            <Text fontSize="md" fontWeight="semibold" color="gray.600">
              Usocial &copy; 2021
            </Text>
          </Box>

          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Text color="gray.900">Sign Up</Text>
              </ModalHeader>
              <ModalCloseButton
                _focusVisible={false}
                _focus={false}
                _focusWithin={false}
              />
              <ModalBody>
                {/* 
              // TODO: Improve the error handling of the forms
              */}
                <Formik validationSchema={SignUpValidationSchema}>
                  <Form>
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
                  </Form>
                </Formik>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Center>
      </Box>
    </>
  );
};

export default Welcome;
