import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Stack,
  useToast,
  Box,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
} from "@chakra-ui/react";

// API
import axios from "../../../api/axios";
import DataContext from "../../../data/data.context";

// Components
import { MdEmail, MdLock } from "react-icons/md";

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
        <Stack spacing={3}>
          {/* Email input */}
          <FormControl>
            <InputGroup>
              <InputLeftElement>
                <MdEmail color={"gray"} />
              </InputLeftElement>
              <Input
                required
                placeholder={"Email"}
                size={"md"}
                name={"email"}
                type={"email"}
              />
            </InputGroup>
          </FormControl>
          {/* Password Input */}
          <FormControl>
            <InputGroup>
              <InputLeftElement>
                <MdLock color={"gray"} />
              </InputLeftElement>

              <Input
                placeholder={"Password"}
                size={"md"}
                minLength={8}
                name={"password"}
                type={"password"}
                required
              />
            </InputGroup>
          </FormControl>
          {/* Submit */}
          <FormControl>
            <InputGroup>
              <Button
                type={"submit"}
                loadingText={"Logging you In"}
                w={"full"}
                size={"md"}
                colorScheme={"blue"}
                isLoading={isSubmitting}
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
