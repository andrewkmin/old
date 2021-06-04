import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Stack, useToast, Box } from "@chakra-ui/react";

// API
import axios from "../../../api/axios";
import DataContext from "../../../data/data.context";

// Components
import EmailInput from "./inputs/EmailInput";
import LoginButton from "./buttons/LoginButton";
import PasswordInput from "./inputs/PasswordInput";

const Login = () => {
  const Toast = useToast();
  const History = useHistory();
  const { setState } = useContext(DataContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // For handling the login
  const handleLogin = async (event) => {
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
      case 404: {
        // Notify
        return Toast({
          title: "That account does not exist",
          status: "error",
          duration: 2000,
          isClosable: false,
        });
      }
      // If there's another status
      default: {
        // Notify
        return Toast({
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
      <form
        autoComplete={"off"}
        onSubmit={(event) => {
          event.preventDefault();
          handleLogin(event);
        }}
      >
        <Stack spacing={3}>
          <EmailInput />
          <PasswordInput />
          <LoginButton isSubmitting={isSubmitting} />
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
