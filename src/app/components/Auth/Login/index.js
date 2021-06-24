import axios from "../../../api/axios";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { MdEmail, MdLock } from "react-icons/md";
import DataContext from "../../../data/data.context";
import {
  Stack,
  useToast,
  Box,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  FormLabel,
} from "@chakra-ui/react";

// Login form component
const Login = () => {
  const toast = useToast();
  const History = useHistory();
  const { setState } = useContext(DataContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // For handling the login
  const handleLogin = async (event) => {
    // Preventing default behavior
    event.preventDefault();
    // Creating a payload
    const PAYLOAD = {
      email: event.currentTarget.elements.email.value,
      password: event.currentTarget.elements.password.value,
    };

    // Loading
    setIsSubmitting(true);

    // Sending the request
    const authResponse = await axios.post("/auth/login", PAYLOAD);

    // Not loading
    setIsSubmitting(false);

    // Checking authentication response status
    switch (authResponse.status) {
      // If authentication response suceeds
      case 200: {
        // Fetching user data
        const { data: userData } = await axios.get("/api/accounts/fetch");

        // Setting the state
        setState({ authenticated: true, userData });
        return History.push("/");
      }
      // If there is no such account
      case 204: {
        // Notify
        return toast({
          title: "That account does not exist",
          status: "error",
          duration: 2000,
          isClosable: false,
        });
      }
      // If there's another status
      default: {
        // Notify
        return toast({
          title: "Check your credentials",
          status: "error",
          isClosable: false,
          duration: 2000,
        });
      }
    }
  };

  return (
    <Box>
      <form autoComplete={"off"} onSubmit={handleLogin}>
        <Stack spacing={5}>
          <Stack>
            {/* Email input */}
            <FormControl>
              <FormLabel fontWeight={"semibold"}>Email</FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <MdEmail color={"gray"} />
                </InputLeftElement>
                <Input
                  required
                  size={"md"}
                  name={"email"}
                  type={"email"}
                  placeholder={"Email"}
                />
              </InputGroup>
            </FormControl>
            {/* Password Input */}
            <FormControl>
              <FormLabel fontWeight={"semibold"}>Password</FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <MdLock color={"gray"} />
                </InputLeftElement>
                <Input
                  required
                  size={"md"}
                  minLength={8}
                  name={"password"}
                  type={"password"}
                  placeholder={"Password"}
                />
              </InputGroup>
            </FormControl>
          </Stack>
          {/* Submit */}
          <FormControl>
            <InputGroup>
              <Button
                w={"full"}
                size={"md"}
                type={"submit"}
                rounded={"full"}
                colorScheme={"blue"}
                isLoading={isSubmitting}
                loadingText={"Logging you In"}
              >
                Login
              </Button>
            </InputGroup>
          </FormControl>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
