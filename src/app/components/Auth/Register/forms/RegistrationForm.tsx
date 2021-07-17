import { ChangeEvent, useState } from "react";
import { Stack, Box, useToast } from "@chakra-ui/react";

import axios from "../../../../api/axios";
// import { useForm } from "react-hook-form";
import EmailInput from "../inputs/EmailInput";
import UsernameInput from "../inputs/UsernameInput";
import PasswordInput from "../inputs/PasswordInput";
import EmailSentView from "../components/EmailSentView";
import LastNameInput from "../inputs/name/LastNameInput";
import FirstNameInput from "../inputs/name/FirstNameInput";
import CreateAccountButton from "../buttons/CreateAccountButton";

// type Inputs = {
//   email: string;
//   password: string;
//   username: string;
//   lastName: string;
//   firstName: string;
// };

const RegistrationForm = () => {
  // const {
  //   watch,
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<Inputs>();
  const toast = useToast();
  const [emailWasSent, setEmailWasSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // For registering
  const handleRegistration = async (event: ChangeEvent<HTMLFormElement>) => {
    // Prevent default behavior
    event.preventDefault();
    // Loading
    setIsSubmitting(true);
    // Creating a payload
    const payload = {
      email: event.target.email.value,
      password: event.target.password.value,
      username: event.target.username.value,
      lastName: event.target.lastName.value,
      firstName: event.target.firstName.value,
    };

    // Sending the response
    const response = await axios.post("/auth/register", payload);

    // Closing all toasts
    toast.closeAll();

    // Not loading anymore
    setIsSubmitting(false);

    // Checking the response status
    switch (response.status) {
      // Created successfully
      case 204:
        return setEmailWasSent(true);

      // If there's another account with the same email
      case 403:
        return toast({
          title: `That account is taken by someone else`,
          status: "error",
          duration: 2000,
          isClosable: false,
        });

      // If there are invalid fields
      case 400:
        return toast({
          title: "There must be some invalid fields",
          status: "error",
          duration: 2000,
          isClosable: false,
        });

      // If another code was returned
      default:
        return toast({
          title: "There was an error",
          status: "error",
          duration: 2000,
          isClosable: false,
        });
    }
  };

  return emailWasSent ? (
    <EmailSentView />
  ) : (
    <Box>
      <form autoComplete={"off"} onSubmit={handleRegistration}>
        <Stack spacing={5}>
          <Stack>
            <UsernameInput />

            <Stack direction={"row"}>
              <FirstNameInput />
              <LastNameInput />
            </Stack>

            <EmailInput />
            <PasswordInput />
          </Stack>

          <CreateAccountButton isSubmitting={isSubmitting} />
        </Stack>
      </form>
    </Box>
  );
};

export default RegistrationForm;
