import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Stack, Flex, Box, useToast } from "@chakra-ui/react";

import _axios from "../../../../api/_axios";
import DataContext from "../../../../data/data.context";

import EmailInput from "../inputs/EmailInput";
import AvatarInput from "../inputs/AvatarInput";
import PasswordInput from "../inputs/PasswordInput";
import LastNameInput from "../inputs/name/LastNameInput";
import FirstNameInput from "../inputs/name/FirstNameInput";
import CreateAccountButton from "../buttons/CreateAccountButton";

const RegistrationForm = () => {
  const Toast = useToast();
  const History = useHistory();
  const { setState } = useContext(DataContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegistration = async (event) => {
    setIsSubmitting(true);

    const { data } = await _axios.post(
      "/auth/register",
      new FormData(event.currentTarget)
    );

    if (!data.error) {
      const { data: userData } = await _axios.get("/api/accounts/fetch");
      setIsSubmitting(false);
      setState({ authenticated: true, userData });
      Toast({
        title: "Account created successfully",
        description: "You have successfully registered",
        status: "success",
        duration: 2000,
        isClosable: false,
      });
      return History.push("/");
    } else {
      setIsSubmitting(false);
      setState({ authenticated: false });
      if (data.error === "Forbidden") {
        return Toast({
          title: "There's already an account with that email 😲",
          status: "error",
          duration: 2000,
          isClosable: false,
        });
      } else if (data.error === "Invalid email") {
        return Toast({
          description: "Please enter a valid email",
          status: "error",
          duration: 2000,
          isClosable: false,
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
