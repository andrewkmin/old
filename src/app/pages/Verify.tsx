import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Stack,
  Text,
  useToast
} from "@chakra-ui/react";
import axios from "../api/axios";
import { ChangeEvent, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const Verify = () => {
  const toast = useToast();
  const history = useHistory();
  const { sid } = useParams<{ sid: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const { status } = await axios.post(`/auth/register/verify/${sid}`, {
      password: event.target.password.value
    });

    setIsSubmitting(false);

    toast.closeAll();

    if (status === 404) {
      toast({
        status: "error",
        isClosable: false,
        title: "Seems like that handle has expired or does not exist"
      });
      return setTimeout(() => history.push("/"), 2000);
    } else if (status === 401)
      toast({ title: "That password is invalid", isClosable: false });
    else {
      toast({
        title: "You've successfully verified your account!",
        description: "Congratulations!!",
        status: "success",
        isClosable: false
      });
      history.push("/");
      return window.location.reload();
    }
  };

  return (
    <Box minH={"100vh"}>
      <Flex minH={"100vh"} alignItems={"center"} justifyContent={"center"}>
        <Stack spacing={5}>
          <Box>
            <Stack alignItems={"center"}>
              <Text fontWeight={"bold"} fontSize={["lg", "xl", "3xl"]}>
                Please re-enter your password below and hit submit!
              </Text>

              <Text fontWeight={"semibold"} fontSize={["sm", "lg", "xl"]}>
                So that we can make sure you are who you are{" "}
              </Text>
            </Stack>
          </Box>

          <form autoComplete={"off"} onSubmit={handleSubmit}>
            <Stack spacing={5}>
              <Center>
                <Input
                  w={"md"}
                  isRequired
                  minLength={8}
                  name={"password"}
                  type={"password"}
                  placeholder={"Something something"}
                />
              </Center>

              <Center>
                <Button
                  type={"submit"}
                  colorScheme={"green"}
                  isLoading={isSubmitting}
                >
                  Verify me ASAP!!!
                </Button>
              </Center>
            </Stack>
          </form>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Verify;
