import { Text, Center, Stack, Divider, Box } from "@chakra-ui/react";

import LoginForm from "./Login/index";
import RegistrationForm from "./Register/index";

const Auth = () => {
  return (
    <Stack mx={[2, 5]} w={"sm"}>
      <Box>
        <Center>
          <Text fontSize={"6xl"} fontWeight={"bold"} color={"teal.500"}>
            Usocial
          </Text>
        </Center>
      </Box>

      <LoginForm />
      <Divider />
      <RegistrationForm />
    </Stack>
  );
};

export default Auth;
