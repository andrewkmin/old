import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import axios from "../../api/axios";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import DataContext from "../../data/data.context";

interface VerificationProps {
  sid: string;
}

// For the form
type Inputs = {
  password: string;
};

const Verification = ({ sid }: VerificationProps) => {
  const toast = useToast();
  const history = useHistory();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { setState } = useContext(DataContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // For submitting verification query
  const handleVerification = async (payload: Inputs) => {
    // Enabling the loader
    setIsSubmitting(true);

    // Sending the password
    const { data, status } = await axios.post(
      `/auth/register/verify/${sid}`,
      payload
    );

    // Closing all toasts
    toast.closeAll();
    // Stopping the loader
    setIsSubmitting(false);

    // If the token has expired
    if (status === 404) {
      setError("password", { message: "That token has expired" });
    }
    // If the password is incorrect
    else if (status === 401) {
      setError("password", { message: "Incorrect password" });
    }
    // If the field is somehow invalid
    else if (status === 400) {
      setError("password", { message: "Invalid password" });
    }
    // If it's correct
    else {
      setState({
        userData: data,
        authenticated: true,
      });
      history.push("/");
    }
  };

  return (
    <Box p={[2, 0]} minW={["xs", "sm", null, "sm"]}>
      <Center>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Stack spacing={5}>
            <form
              autoComplete={"off"}
              onSubmit={handleSubmit(handleVerification)}
            >
              <Stack spacing={5}>
                <Center>
                  <FormControl isInvalid={errors?.password && true}>
                    <Input
                      autoFocus
                      size={"lg"}
                      type={"password"}
                      placeholder={"Account password"}
                      {...register("password", {
                        required: true,
                        minLength: 8,
                      })}
                    />
                    <FormErrorMessage>
                      {errors?.password?.message || "Invalid password"}
                    </FormErrorMessage>
                    <FormHelperText>
                      Please enter the password of your account to activate it
                    </FormHelperText>
                  </FormControl>
                </Center>

                <Center>
                  <Button
                    w={"full"}
                    size={"lg"}
                    type={"submit"}
                    rounded={"full"}
                    bgColor={"purple.400"}
                    colorScheme={"purple"}
                    isLoading={isSubmitting}
                  >
                    Verify account
                  </Button>
                </Center>
              </Stack>
            </form>
          </Stack>
        </Flex>
      </Center>
    </Box>
  );
};

export default Verification;
