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
  Container,
  Divider,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import _axios from "../helpers/_axios";
import verification from "../auth/verify.token";
import _authContext from "../auth/auth.context";

function Login({ registrationOnOpen }) {
  const History = useHistory();
  const AuthContext = useContext(_authContext);
  const [isLoading, setLoading] = useState(false);
  const loginCredentials = {
    email: "",
    password: "",
  };

  const submit = async () => {
    if (
      loginCredentials.email.length !== 0 &&
      loginCredentials.password.length !== 0
    ) {
      setLoading(true);
      const { data } = await _axios.post("/auth/login", loginCredentials);
      if (!data.error) {
        const isValid = await verification.verify();
        if (isValid) {
          AuthContext.setAuthenticated(isValid);
          History.push("/");
        }
      }
    }
  };

  const handleInput = (event, target) => {
    if (event.target.value.length !== 0) {
      target = event.target.value;
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
            <Stack p={7} spacing={3} boxSize="sm">
              <FormControl isRequired>
                <InputGroup>
                  <Input
                    placeholder="Email"
                    size="md"
                    name="email"
                    type="email"
                    onChange={(event) => {
                      handleInput(event, loginCredentials.email);
                    }}
                    onKeyUp={(event) => {
                      handleInput(event, loginCredentials.email);
                    }}
                  />
                </InputGroup>
                <FormErrorMessage>Here should be an error</FormErrorMessage>
              </FormControl>

              <FormControl isRequired>
                <Input
                  placeholder="Password"
                  size="md"
                  min={8}
                  name="password"
                  type="password"
                  onChange={(event) => {
                    handleInput(event, loginCredentials.password);
                  }}
                  onKeyUp={(event) => {
                    handleInput(event, loginCredentials.password);
                  }}
                />
                <FormErrorMessage>Here should be an error</FormErrorMessage>
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
                  onClick={registrationOnOpen}
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
  );
}

export default Login;
