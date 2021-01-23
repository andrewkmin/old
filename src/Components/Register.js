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
} from "@chakra-ui/react";
import { useState } from "react";

import _axios from "../helpers/_axios";

const Register = ({ registrationIsOpen, registrationOnClose }) => {
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegistration = async (event) => {
    setIsSubmitting(true);

    const { data } = await _axios.post(
      "/auth/register",
      new FormData(event.currentTarget)
    );

    if (!data.error) {
      toast({
        title: "Account created successfully",
        description: "You have successfully registered",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setIsSubmitting(false);
    } else if (data.error) {
      toast({
        title: data.error,
        description: "There's already an account with that email",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Modal onClose={registrationOnClose} isOpen={registrationIsOpen} isCentered>
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
          <form
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
                <Input
                  required
                  type="email"
                  name="email"
                  placeholder="Email"
                  size="md"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  required
                  type="password"
                  name="password"
                  placeholder="Password"
                  size="md"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Profile picture(optional)</FormLabel>
                <Input type="file" name="avatar" size="md" />
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
                Sign Up
              </Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Register;
