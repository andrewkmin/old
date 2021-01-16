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

const Login = ({ registrationOnOpen }) => {
  const History = useHistory();
  const AuthContext = useContext(_authContext);
  const [isLoading, setLoading] = useState(false);

  const credentials = {
    email: "",
    password: "",
  };

  const submit = async () => {
    if (credentials.email.length !== 0 && credentials.password.length !== 0) {
      setLoading(true);
      const { data } = await _axios.post("/auth/login", credentials);
      if (!data.error) {
        const isValid = await verification.verify();
        if (isValid) {
          AuthContext.setAuthenticated(isValid);
          History.push("/");
        }
      }
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
                      credentials.email = event.target.value;
                    }}
                    onKeyUp={(event) => {
                      credentials.email = event.target.value;
                    }}
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
                  onChange={(event) => {
                    credentials.password = event.target.value;
                  }}
                  onKeyUp={(event) => {
                    credentials.password = event.target.value;
                  }}
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
};

export default Login;
