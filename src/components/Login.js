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
import _axios from "../api/_axios";
import { BiLogIn } from "react-icons/bi";
import _WebSocket from "../utils/websocket";
import { RiUser3Line } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import _AuthContext from "../auth/auth.context";
import _DataContext from "../data/data.context";
import { MdEmail, MdLock } from "react-icons/md";
import React, { useState, useContext } from "react";

const Login = ({ registrationOnOpen }) => {
  const toast = useToast();
  const History = useHistory();
  const DataContext = useContext(_DataContext);
  const AuthContext = useContext(_AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (event) => {
    setIsSubmitting(true);
    const PAYLOAD = {
      email: event.currentTarget.elements.email.value,
      password: event.currentTarget.elements.password.value,
    };

    // Authentication
    const { data: auth } = await _axios.post("/auth/login", PAYLOAD);
    // User data
    const { data: userData } = await _axios.get("/api/accounts/fetch");

    if (!auth.error) {
      AuthContext.setAuthenticated(true);
      DataContext.setUserData(userData);
      setIsSubmitting(false);
      _WebSocket.ping();
      History.push("/");
      return toast({
        title: "Successfully logged in",
        description: "Welcome to Usocial",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      AuthContext.setAuthenticated(false);
      setIsSubmitting(false);
      if (auth.error === "No Accounts") {
        return toast({
          title: "No such account",
          description: "There are no accounts associated with that email",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else if (auth.error === "Forbidden") {
        return toast({
          title: "Check your credentials",
          description: "The password you have entered is incorrect",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        return toast({
          title: "There was an error",
          description: auth.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box top="150" pos="absolute">
      <Box>
        <Center>
          <Text fontSize="6xl" fontWeight="bold" color="teal.500">
            Usocial
          </Text>
        </Center>

        <Container>
          <Center>
            <form
              autoComplete="off"
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
                  leftIcon={<BiLogIn />}
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
                  leftIcon={<RiUser3Line />}
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
