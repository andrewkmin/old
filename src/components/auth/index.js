import { Text, Center, Stack, Divider, Box } from "@chakra-ui/react";

import LoginForm from "./Login/index";
import RegistrationForm from "./Register/index";

const Auth = () => {
  return (
    <Box top={150} pos={"absolute"}>
      <Stack m={5}>
        <Box>
          <Center>
            <Text fontSize={"6xl"} fontWeight={"bold"} color={"teal.500"}>
              Usocial
            </Text>
          </Center>
        </Box>

        <Box>
          <Center>
            <LoginForm />
          </Center>
        </Box>

        <Box>
          <Center>
            <Box w={"sm"}>
              <Divider />
            </Box>
          </Center>
        </Box>

        <Box>
          <Center>
            <RegistrationForm />
          </Center>
        </Box>
      </Stack>
    </Box>
  );
};

export default Auth;
