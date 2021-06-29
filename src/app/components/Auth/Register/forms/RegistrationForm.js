import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Stack, Box, useToast } from "@chakra-ui/react";

import axios from "../../../../api/axios";
import DataContext from "../../../../data/data.context";

import EmailInput from "../inputs/EmailInput";
import AvatarInput from "../inputs/AvatarInput";
import PasswordInput from "../inputs/PasswordInput";
import LastNameInput from "../inputs/name/LastNameInput";
import FirstNameInput from "../inputs/name/FirstNameInput";
import CreateAccountButton from "../buttons/CreateAccountButton";
import UsernameInput from "../inputs/UsernameInput";

const RegistrationForm = () => {
  const Toast = useToast();
  const History = useHistory();
  const { setState } = useContext(DataContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // For registering
  const handleRegistration = async (event) => {
    // Prevent default behavior
    event.preventDefault();
    // Loading
    setIsSubmitting(true);

    // Sending the response
    const response = await axios.post(
      "/auth/register",
      new FormData(event.target)
    );

    // Not loading anymore
    setIsSubmitting(false);

    // Checking the response status
    switch (response.status) {
      // Created successfully
      case 201: {
        // Fetching user data
        const { data: userData } = await axios.get("/api/accounts/fetch");

        // Updating the state
        setState({ authenticated: true, userData });

        // Notifying
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
      case 403: {
        console.log(response.data);
        // Notifying
        return Toast({
          title: `That ${
            response?.data?.target[0] === "email" ? "account" : "username"
          } is taken by someone else`,
          status: "error",
          duration: 2000,
          isClosable: false,
        });
      }
      // If there are invalid fields
      case 401: {
        // Notifying
        return Toast({
          title: "There must be some invalid fields",
          status: "error",
          duration: 2000,
          isClosable: false,
        });
      }
      // If another code
      default: {
        return Toast({
          title: "There was an error",
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
        onSubmit={handleRegistration}
        encType={"multipart/form-data"}
      >
        <Stack spacing={3}>
          <Box>
            <UsernameInput />
          </Box>
          <Box>
            <Stack direction={"row"}>
              <FirstNameInput />
              <LastNameInput />
            </Stack>
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
