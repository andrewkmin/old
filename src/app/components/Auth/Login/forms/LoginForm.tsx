import {
  Stack,
  useToast,
  Box,
  FormControl,
  InputGroup,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import axios from "../../../../api/axios";
import { useHistory } from "react-router-dom";
import LoginButton from "../buttons/LoginButton";
import DataContext from "../../../../data/data.context";
import { useState, useContext, ChangeEvent } from "react";

// Login form component
const LoginForm = () => {
  const toast = useToast();
  const History = useHistory();
  const { setState } = useContext(DataContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // For handling the login
  const handleLogin = async (event: ChangeEvent<HTMLFormElement>) => {
    // Enable the loader
    setIsSubmitting(true);
    // Preventing default behavior
    event.preventDefault();

    // Sending the request
    const authResponse = await axios.post("/auth/login", {
      email: event.target.email.value,
      password: event.target.password.value,
    });

    // Disable the loader
    setIsSubmitting(false);

    // Checking response status
    if (authResponse.status !== 200) {
      const { status } = authResponse;
      const title =
        status === 404
          ? "That account does not exist"
          : status === 403
          ? "Invalid credentials"
          : status === 400
          ? "There are invalid fields"
          : "There was an error";

      return toast({
        title,
        duration: 2000,
        status: "error",
        isClosable: false,
      });
    } else {
      // Fetching user data
      const { data: userData } = await axios.get("/api/accounts/fetch");
      // Setting the state
      setState({ authenticated: true, userData });
      return History.push("/");
    }
  };

  return (
    <Box>
      <form autoComplete={"off"} onSubmit={handleLogin}>
        <Stack spacing={5}>
          <Stack>
            {/* Email input */}
            <FormControl>
              <FormLabel>Email</FormLabel>
              <InputGroup>
                <Input
                  required
                  size={"lg"}
                  name={"email"}
                  type={"email"}
                  placeholder={"Email"}
                />
              </InputGroup>
            </FormControl>

            {/* Password Input */}
            <FormControl>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  required
                  size={"lg"}
                  minLength={8}
                  name={"password"}
                  type={"password"}
                  placeholder={"Password"}
                />
              </InputGroup>
            </FormControl>
          </Stack>

          {/* Submit */}
          <LoginButton isSubmitting={isSubmitting} />
        </Stack>
      </form>
    </Box>
  );
};

export default LoginForm;
