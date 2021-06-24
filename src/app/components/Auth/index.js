// Components
import Login from "./Login";
import Registration from "./Register";
import { Text, Center, Stack, Divider, Box, chakra } from "@chakra-ui/react";

// Nice "OR" divider
const OrDivider = () => (
  <Stack direction={"row"} alignItems={"center"}>
    <Divider />
    <chakra.span fontWeight={"semibold"} color={"gray.500"}>
      OR
    </chakra.span>
    <Divider />
  </Stack>
);

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

      <Stack>
        {/* Login Form */}
        <Login />
        {/* Nice Divider */}
        <OrDivider />
        {/* Registration Form */}
        <Registration />
      </Stack>
    </Stack>
  );
};

export default Auth;
