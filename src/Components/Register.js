import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  Text,
  ModalBody,
  Stack,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import _axios from "../api/_axios";
import _WebSocket from "../utils/websocket";
import { useHistory } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import _AuthContext from "../auth/auth.context";
import { MdEmail, MdLock } from "react-icons/md";
import React, { useState, useContext } from "react";

const Register = ({ registrationIsOpen, registrationOnClose }) => {
  const toast = useToast();
  const History = useHistory();
  const AuthContext = useContext(_AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegistration = async (event) => {
    setIsSubmitting(true);

    const { data } = await _axios.post(
      "/auth/register",
      new FormData(event.currentTarget)
    );

    if (!data.error) {
      setIsSubmitting(false);
      AuthContext.setAuthenticated(true);
      _WebSocket.ping();
      toast({
        title: "Account created successfully",
        description: "You have successfully registered",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      return History.push("/");
    } else {
      setIsSubmitting(false);
      if (data.error === "Forbidden") {
        return toast({
          title: "Forbidden",
          description: "There's already an account with that email",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else if (data.error === "Invalid email") {
        return toast({
          title: "Invalid Email",
          description: "Please enter a valid email",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
      }
    }

    return data;
  };

  return (
    <Modal onClose={registrationOnClose} isOpen={registrationIsOpen} isCentered>
      <ModalOverlay />
      <ModalContent m={2}>
        <ModalHeader>
          <Flex>
            <Text fontWeight="bold">Sign Up</Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton
          _focusVisible={false}
          _focus={false}
          _focusWithin={false}
        />
        <ModalBody>
          <form
            autoComplete="off"
            encType="multipart/form-data"
            onSubmit={(event) => {
              event.preventDefault();
              handleRegistration(event);
            }}
          >
            <Stack mt={4} spacing={4}>
              <Flex>
                <Box me={1}>
                  <FormControl isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      required
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      size="md"
                    />
                  </FormControl>
                </Box>

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
              </Flex>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <MdEmail color="gray" />
                  </InputLeftElement>
                  <Input
                    required
                    type="email"
                    name="email"
                    placeholder="Email"
                    size="md"
                  />
                </InputGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <MdLock color="gray" />
                  </InputLeftElement>
                  <Input
                    required
                    type="password"
                    name="password"
                    placeholder="Password"
                    size="md"
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Profile picture(optional)</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <FaUserCircle color="gray" />
                  </InputLeftElement>
                  <Input type="file" name="avatar" size="md" />
                </InputGroup>
              </FormControl>

              <Button
                _focusVisible={false}
                _focus={false}
                _focusWithin={false}
                colorScheme="teal"
                type="submit"
                mt={2}
                mb={2}
                isLoading={isSubmitting}
                loadingText="Creating an account"
              >
                Create Account
              </Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Register;
