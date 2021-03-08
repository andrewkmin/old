import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Stack, useToast, Box } from "@chakra-ui/react";

import _axios from "../../../../api/_axios";
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
    setIsSubmitting(true);
    const PAYLOAD = {
      email: event.currentTarget.elements.email.value,
      password: event.currentTarget.elements.password.value,
    };

    const { data: auth } = await _axios.post("/auth/login", PAYLOAD);

    // If authentication response suceeds
    if (!auth?.error) {
      const { data: userData } = await _axios.get("/api/accounts/fetch");
      if (!userData?.error) {
        setIsSubmitting(false);
        setState({
          userData: userData,
          authenticated: true,
        });
        Toast({
          title: "Successfully logged in",
          status: "success",
          duration: 2000,
          isClosable: false,
        });
        return History.push("/");
      } else {
        setIsSubmitting(false);
        return Toast({
          title: "There was an error",
          description: auth.error,
          status: "error",
          duration: 2000,
          isClosable: false,
        });
      }
    } else {
      // Updating the states
      setIsSubmitting(false);
      setState({
        userData: {},
        authenticated: false,
      });

      if (auth?.code === "no_account".toUpperCase()) {
        return Toast({
          title: "No such account",
          status: "error",
          duration: 2000,
          isClosable: false,
        });
      } else if (auth?.code === "wrong_password".toUpperCase()) {
        return Toast({
          description: "The password you have entered is incorrect",
          status: "error",
          duration: 2000,
          isClosable: false,
        });
      } else if (auth?.code === "missing_fields".toUpperCase()) {
        return Toast({
          description: "There are missing fields",
          status: "error",
          duration: 2000,
          isClosable: false,
        });
      } else {
        return Toast({
          title: "There was an error",
          description: auth?.error,
          status: "error",
          duration: 2000,
          isClosable: false,
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

export default LoginForm;
