// Components
import Login from "./Login";
import Registration from "./Register";
import {
  Text,
  Center,
  Stack,
  Divider,
  Box,
  chakra,
  Tooltip,
  Heading,
} from "@chakra-ui/react";

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
        <Stack spacing={6}>
          {/* Registration Form */}
          <Registration />
          {/* TODO: Add forgot password form */}
          <Tooltip label={"We're working on it"}>
            <Text
              color={"gray.500"}
              textAlign={"center"}
              cursor={"not-allowed"}
              textDecor={"underline"}
              fontWeight={"semibold"}
            >
              Forgot your password?
            </Text>
          </Tooltip>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Auth;
