import {
  Input,
  Text,
  Box,
  Button,
  Stack,
  Center,
  FormControl,
  InputGroup,
  Container,
  Divider,
  useToast,
  InputLeftElement,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { MdEmail, MdLock } from "react-icons/md";

import _axios from "../helpers/_axios";
import _authContext from "../auth/auth.context";

/**
 * TODO: Fix the login bug (event.currentTarget is null)
 * */

const Login = ({ registrationOnOpen }) => {
  const toast = useToast();
  const History = useHistory();
  const AuthContext = useContext(_authContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (event) => {
    setIsSubmitting(true);

    const { data } = await _axios.post(
      "/auth/login",
      new FormData(event.currentTarget)
    );

    if (!data.error) {
      setIsSubmitting(false);
      AuthContext.setAuthenticated(true);
      History.push("/");
    } else if (data.error) {
      toast({
        title: "Check your credentials",
        description:
          "There are no accounts associated with that email and password",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsSubmitting(false);
      AuthContext.setAuthenticated(false);
    }
  };

  return (
    <Box pos="absolute" top="150" height="full" width="full">
      <Box>
        <Center>
          <Text fontSize="6xl" fontWeight="bold" color="teal.500">
            Usocial
          </Text>
        </Center>

        <Container>
          <Center>
            <form
              encType="multipart/form-data"
              onSubmit={(event) => {
                event.preventDefault();
                handleLogin(event);
              }}
            >
              <Stack p={7} spacing={3} boxSize="sm">
                <FormControl>
                  <InputGroup>
                    <InputLeftElement>
                      <MdEmail color="gray" />
                    </InputLeftElement>
                    <Input
                      required
                      placeholder="Email"
                      size="md"
                      name="email"
                      type="email"
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <InputGroup>
                    <InputLeftElement>
                      <MdLock color="gray" />
                    </InputLeftElement>
                    <Input
                      placeholder="Password"
                      size="md"
                      min={8}
                      name="password"
                      type="password"
                      required
                    />
                  </InputGroup>
                </FormControl>

                <Button
                  _focusVisible={false}
                  _focus={false}
                  _focusWithin={false}
                  type="submit"
                  loadingText="Logging you In"
                  m={1}
                  colorScheme="blue"
                  size="md"
                  isLoading={isSubmitting}
                >
                  Log In
                </Button>
                <Divider />
                <Button
                  type="button"
                  _focusVisible={false}
                  _focus={false}
                  _focusWithin={false}
                  size="md"
                  onClick={registrationOnOpen}
                  colorScheme="teal"
                >
                  Create New Account
                </Button>
              </Stack>
            </form>
          </Center>
        </Container>
      </Box>
    </Box>
  );
};

export default Login;
