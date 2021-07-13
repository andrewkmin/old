// Components
import Login from "./Login";
import OrDivider from "../OrDivider";
import Registration from "./Register";
import { Text, Center, Stack, Box, Tooltip, Heading } from "@chakra-ui/react";

// Component that holds both registration and login forms
const Auth = () => {
  return (
    <Stack mx={[2, null, 5]} spacing={6} w={["xs", "sm", null, "sm"]}>
      <Box>
        <Center>
          <Heading fontSize={"6xl"} fontWeight={"bold"} color={"teal.500"}>
            Usocial
          </Heading>
        </Center>
      </Box>

      <Stack>
        {/* Login Form */}
        <Login />
        {/* Nice Divider */}
        <OrDivider />
        <Registration />
        {/* <Stack spacing={6}> */}
        {/* Registration Form */}
        {/* <Tooltip label={"We're working on it"}>
            <Text
              color={"gray.500"}
              textAlign={"center"}
              cursor={"not-allowed"}
              textDecor={"underline"}
              fontWeight={"semibold"}
            >
              Forgot your password?
            </Text>
          </Tooltip> */}
        {/* </Stack> */}
      </Stack>
    </Stack>
  );
};

export default Auth;
