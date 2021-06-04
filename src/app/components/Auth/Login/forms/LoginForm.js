import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Stack, useToast, Box } from "@chakra-ui/react";

import axios from "../../../../api/axios";
import DataContext from "../../../../data/data.context";

import EmailInput from "../inputs/EmailInput";
import LoginButton from "../buttons/LoginButton";
import PasswordInput from "../inputs/PasswordInput";

const LoginForm = () => {
  const Toast = useToast();
  const History = useHistory();
  const { setState } = useContext(DataContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (event) => {
    const PAYLOAD = {
      email: event.currentTarget.elements.email.value,
      password: event.currentTarget.elements.password.value,
    };

    setIsSubmitting(true);
    const authResponse = await axios.post("/auth/login", PAYLOAD);
    setIsSubmitting(false);

    console.log({ authResponse });

    // If authentication response suceeds
    if (authResponse.status === 200) {
      const userResponse = await axios.get("/api/accounts/fetch");

      console.log({ userResponse });

      if (userResponse.status === 200) {
        setState({
          authenticated: true,
          userData: userResponse.data,
        });
        History.push("/");
      } else {
        Toast({
          title: "There was an error",
          status: "error",
          duration: 2000,
          isClosable: false,
        });
        console.warn({ userResponse });
      }
    } else if (authResponse.status === 404) {
      Toast({
        title: "That account does not exist",
        status: "error",
        duration: 2000,
        isClosable: false,
      });
    } else {
      // Updating the states
      setIsSubmitting(false);
      setState({
        userData: {},
        authenticated: false,
      });
      Toast({
        title: "Check your credentials",
        status: "error",
        isClosable: false,
        duration: 2000,
      });
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

export default LoginForm;
