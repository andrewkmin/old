import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Stack, Flex, Box, useToast } from "@chakra-ui/react";

import _axios from "../../../../api/axios";
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
    const response = await _axios.post(
      "/auth/register",
      new FormData(event.currentTarget)
    );
    setIsSubmitting(false);

    if (response.status === 200) {
      const { data: userData } = await _axios.get("/api/accounts/fetch");
      setState({ authenticated: true, userData });
      Toast({
        title: "Account created successfully",
        description: "You have successfully registered",
        status: "success",
        duration: 2000,
        isClosable: false,
      });
      return History.push("/");
    }
    // If there's another account with the same email
    else if (response.status === 403) {
      Toast({
        title: "That account is taken by someone else",
        status: "error",
        duration: 2000,
        isClosable: false,
      });
    }
    // If there are invalid fields
    else if (response.status === 401) {
      Toast({
        title: "There must be some invalid fields",
        status: "error",
        duration: 2000,
        isClosable: false,
      });
    } else {
      Toast({
        title: "There was an error",
        status: "error",
        duration: 2000,
        isClosable: false,
      });
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
