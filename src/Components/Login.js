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
import { BiLogIn } from "react-icons/bi";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { MdEmail, MdLock } from "react-icons/md";
import { RiUser3Line } from "react-icons/ri";

import _axios from "../utils/_axios";

import _AuthContext from "../auth/auth.context";
import _DataContext from "../utils/data.context";

const Login = ({ registrationOnOpen }) => {
  const toast = useToast();
  const History = useHistory();
  const DataContext = useContext(_DataContext);
  const AuthContext = useContext(_AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchUserData = async () => {
    const { data } = await _axios.get("/api/accounts/fetch");
    return data;
  };

  const handleLogin = async (event) => {
    const PAYLOAD = {
      email: event.currentTarget.elements.email.value,
      password: event.currentTarget.elements.password.value,
    };

    setIsSubmitting(true);

    const { data } = await _axios.post("/auth/login", PAYLOAD);

    if (!data.error) {
      toast({
        title: "Successfully logged in",
        description: "Welcome to Usocial",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      const UserData = await fetchUserData();
      AuthContext.setAuthenticated(true);
      DataContext.setUserData(UserData);
      setIsSubmitting(false);
      History.push("/");
    } else if (data.error) {
      if (data.error === "No Accounts") {
        toast({
          title: "No such account",
          description: "There are no accounts associated with that email",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else if (data.error === "Forbidden") {
        toast({
          title: "Check your credentials",
          description: "The password you have entered is incorrect",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }

      AuthContext.setAuthenticated(false);
      setIsSubmitting(false);
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
