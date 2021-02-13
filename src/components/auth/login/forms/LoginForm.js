import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Stack, useToast, Box } from "@chakra-ui/react";

import _axios from "../../../../api/_axios";
import _AuthContext from "../../../../auth/auth.context";
import _DataContext from "../../../../data/data.context";

import EmailInput from "../inputs/EmailInput";
import LoginButton from "../buttons/LoginButton";
import PasswordInput from "../inputs/PasswordInput";

const LoginForm = () => {
  const Toast = useToast();
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
      Toast({
        title: "Successfully logged in",
        description: "Welcome to Usocial",
        status: "success",
        duration: 1000,
        isClosable: false,
      });
      return History.push("/");
    } else {
      setIsSubmitting(false);
      AuthContext.setAuthenticated(false);
      if (auth.error === "No Accounts") {
        return Toast({
          title: "No such account",
          description: "There are no accounts associated with that email",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else if (auth.error === "Forbidden") {
        return Toast({
          title: "Check your credentials",
          description: "The password you have entered is incorrect",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        return Toast({
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
    <Box w={"sm"}>
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
