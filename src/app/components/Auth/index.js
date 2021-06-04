// Components
import Login from "./Login";
import Registration from "./Register";

import { Text, Center, Stack, Divider, Box } from "@chakra-ui/react";

// Component that holds both registration and login forms
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

      {/* Login Form */}
      <Login />
      <Divider />
      {/* Registration Form */}
      <Registration />
    </Stack>
  );
};

export default Auth;
