import { Text, Box, Center } from "@chakra-ui/react";

import LoginForm from "./forms/LoginForm";

const Login = ({ registrationOnOpen }) => {
  return (
    <Box top={150} pos={"absolute"}>
      <Center>
        <Text fontSize={"6xl"} fontWeight={"bold"} color={"teal.500"}>
          Usocial
        </Text>
      </Center>

      <Center>
        <LoginForm registrationOnOpen={registrationOnOpen} />
      </Center>
    </Box>
  );
};

export default Login;
