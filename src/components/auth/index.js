import LoginForm from "../Login/index";
import RegistrationForm from "../Register/index";
import { Text, Center, Stack, Divider, Box } from "@chakra-ui/react";

const Auth = () => {
  return (
    <Box w={"full"} top={150} pos={"absolute"}>
      <Stack m={5}>
        <Center>
          <Text fontSize={"6xl"} fontWeight={"bold"} color={"teal.500"}>
            Usocial
          </Text>
        </Center>
        <Center>
          <LoginForm />
        </Center>
        <Center>
          <Box w={"sm"}>
            <Divider />
          </Box>
        </Center>
        <Center>
          <RegistrationForm />
        </Center>
      </Stack>
    </Box>
  );
};

export default Auth;
