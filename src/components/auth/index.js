import { Text, Center, Stack, Divider, Box } from "@chakra-ui/react";

import LoginForm from "./Login/index";
import RegistrationForm from "./Register/index";

const Auth = () => {
  return (
    <Box w={["sm"]} top={150} pos={"absolute"}>
      <Stack m={5}>
        <Center>
          <Text fontSize={"6xl"} fontWeight={"bold"} color={"teal.500"}>
            Usocial
          </Text>
        </Center>

        <LoginForm />
        <Divider />
        <RegistrationForm />
      </Stack>
    </Box>
  );
};

export default Auth;
