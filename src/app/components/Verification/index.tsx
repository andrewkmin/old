import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import axios from "../../api/axios";
import { useContext } from "react";
import { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import DataContext from "../../data/data.context";

interface VerificationProps {
  sid: string;
}

const Verification = ({ sid }: VerificationProps) => {
  const toast = useToast();
  const history = useHistory();
  const { setState } = useContext(DataContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    event.preventDefault();

    const { data, status } = await axios.post(`/auth/register/verify/${sid}`, {
      password: event.target.password.value,
    });

    toast.closeAll();
    setIsSubmitting(false);

    if (status === 404) {
      return toast({
        status: "error",
        isClosable: false,
        title: "Token has expired or doesn't exist",
      });
    } else if (status === 401) {
      return toast({
        title: "That password is invalid",
        isClosable: false,
        status: "error",
      });
    } else {
      setState({
        userData: data,
        authenticated: true,
      });
      toast({
        status: "success",
        isClosable: false,
        title: "You've successfully verified your account!",
      });
      return history.push("/");
    }
  };

  return (
    <Box p={[2, 0]} minW={["xs", "sm", null, "sm"]}>
      <Center>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Stack spacing={5}>
            <form autoComplete={"off"} onSubmit={handleSubmit}>
              <Stack spacing={5}>
                <Center>
                  <FormControl>
                    <Input
                      autoFocus
                      isRequired
                      size={"lg"}
                      minLength={8}
                      name={"password"}
                      type={"password"}
                      placeholder={"Account password"}
                    />
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
