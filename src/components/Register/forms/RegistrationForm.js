import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Stack, Flex, Box, useToast } from "@chakra-ui/react";

import _axios from "../../../api/_axios";
import _AuthContext from "../../../auth/auth.context";

import EmailInput from "../inputs/EmailInput";
import AvatarInput from "../inputs/AvatarInput";
import PasswordInput from "../inputs/PasswordInput";
import LastNameInput from "../inputs/name/LastNameInput";
import FirstNameInput from "../inputs/name/FirstNameInput";
import CreateAccountButton from "../buttons/CreateAccountButton";

const RegistrationForm = () => {
  const Toast = useToast();
  const History = useHistory();
  const AuthContext = useContext(_AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegistration = async (event) => {
    setIsSubmitting(true);

    const { data } = await _axios.post(
      "/auth/register",
      new FormData(event.currentTarget)
    );

    if (!data.error) {
      setIsSubmitting(false);
      AuthContext.setAuthenticated(true);
      Toast({
        title: "Account created successfully",
        description: "You have successfully registered",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      return History.push("/");
    } else {
      setIsSubmitting(false);
      if (data.error === "Forbidden") {
        return Toast({
          title: "Forbidden",
          description: "There's already an account with that email",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else if (data.error === "Invalid email") {
        return Toast({
          title: "Invalid Email",
          description: "Please enter a valid email",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        return data;
      }
    }
  };

  return (
    <Box>
      <form
        autoComplete={"off"}
        encType={"multipart/form-data"}
        onSubmit={(event) => {
          event.preventDefault();
          handleRegistration(event);
        }}
      >
        <Stack mt={4} spacing={4}>
          <Box>
            <Flex>
              <FirstNameInput />
              <LastNameInput />
            </Flex>
          </Box>

          <EmailInput />
          <PasswordInput />
          <AvatarInput />
          <CreateAccountButton isSubmitting={isSubmitting} />
        </Stack>
      </form>
    </Box>
  );
};

export default RegistrationForm;
