import { Text, Box, Center, Container } from "@chakra-ui/react";

import LoginForm from "./forms/LoginForm";

const Login = ({ registrationOnOpen }) => {
  return (
    <Box top={"150"} pos={"absolute"}>
      <Box>
        <Center>
          <Text fontSize={"6xl"} fontWeight={"bold"} color={"teal.500"}>
            Usocial
          </Text>
        </Center>

        <Container>
          <Center>
            <LoginForm registrationOnOpen={registrationOnOpen} />
          </Center>
        </Container>
      </Box>
    </Box>
  );
};

export default Login;
