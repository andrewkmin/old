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
} from "@chakra-ui/react";

function Register({ registrationIsOpen, registrationOnClose }) {
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
              <Input type="email" name="email" placeholder="Email" size="md" />
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
  );
}

export default Register;
