import {
  Stack,
  Box,
  useToast,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../../../api/axios";
import { FieldErrorResponse } from "../../../../types";
import EmailSentView from "../components/EmailSentView";
import { email as emailPattern } from "../../../../utils/patterns";

export type Inputs = {
  email: string;
  password: string;
  username: string;
  lastName: string;
  firstName: string;
};

const RegistrationForm = () => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Inputs>();
  const toast = useToast({ position: "bottom-left" });
  const [emailWasSent, setEmailWasSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // For registering
  const handleRegistration = async (payload: Inputs) => {
    // Loading
    setIsSubmitting(true);
    // Sending the response
    const response = await axios.post("/auth/register", payload);
    // Stopping the loader
    setIsSubmitting(false);

    // Closing all toasts
    toast.closeAll();

    // Checking response status
    if (response.status !== 204) {
      const { status, data } = response;

      if (status === 400) {
        const errorResponse = data as FieldErrorResponse;
        errorResponse.errors?.forEach((error) =>
          setError(error.param as any, { message: error.msg })
        );
      } else if (status === 403) {
        setError("email", { message: "Email is taken" });
        setError("username", { message: "Username is taken" });
      } else {
        toast({
          status: "error",
          isClosable: false,
          title: "There was an error",
        });
      }
    } else return setEmailWasSent(true);
  };

  return emailWasSent ? (
    <EmailSentView payload={getValues()} />
  ) : (
    <Box>
      <form autoComplete={"off"} onSubmit={handleSubmit(handleRegistration)}>
        <Stack spacing={5}>
          <Stack>
            <FormControl isInvalid={errors.username && true}>
              <FormLabel>Username</FormLabel>
              <Input
                size={"lg"}
                type={"text"}
                placeholder={"Username"}
                {...register("username", {
                  required: true,
                  pattern: /^[a-z0-9_.]+$/g,
                })}
                isInvalid={errors.username && true}
              />
              <FormErrorMessage>
                {errors?.username?.message || "Invalid username"}
              </FormErrorMessage>
            </FormControl>

            <Stack direction={"row"}>
              <Box>
                <FormControl isInvalid={errors.firstName && true}>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    size={"lg"}
                    type={"text"}
                    placeholder={"First Name"}
                    {...register("firstName", { required: true })}
                  />
                  <FormErrorMessage>
                    {errors.lastName && "Invalid name"}
                  </FormErrorMessage>
                </FormControl>
              </Box>

              <Box>
                <FormControl isInvalid={errors.lastName && true}>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    size={"lg"}
                    type={"text"}
                    placeholder={"Last Name"}
                    {...register("lastName", { required: true })}
                  />
                  <FormErrorMessage>
                    {errors.lastName && "Invalid name"}
                  </FormErrorMessage>
                </FormControl>
              </Box>
            </Stack>

            <FormControl isInvalid={errors?.email && true}>
              <FormLabel>Email</FormLabel>
              <Input
                size={"lg"}
                type={"email"}
                placeholder={"Email"}
                {...register("email", {
                  required: true,
                  pattern: emailPattern,
                })}
              />

              <FormErrorMessage>
                {errors?.email?.message || "Invalid email"}
              </FormErrorMessage>

              <FormHelperText>
                Will be used to send you a verification email
              </FormHelperText>
            </FormControl>

            <FormControl isInvalid={errors.password && true}>
              <FormLabel>Password</FormLabel>
              <Input
                size={"lg"}
                type={"password"}
                placeholder={"Password"}
                {...register("password", { required: true, minLength: 8 })}
              />
              <FormErrorMessage>
                {errors.password && "Should be at least 8 characters long"}
              </FormErrorMessage>
            </FormControl>
          </Stack>

          <Button
            w={"full"}
            size={"lg"}
            type={"submit"}
            rounded={"full"}
            fontWeight={"thin"}
            fontStyle={"normal"}
            colorScheme={"purple"}
            bgColor={"purple.400"}
            isLoading={isSubmitting}
            fontFamily={"ubuntu bold"}
            loadingText={"Creating an account"}
          >
            Create an account
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default RegistrationForm;
