import Login from "./Login";
import Registration from "./Register";
import { Stack } from "@chakra-ui/react";

// Component that holds both registration and login forms
const Auth = () => {
  return (
    <Stack p={2} spacing={6} h={"full"} minW={["xs", "sm", null, "sm"]}>
      <Stack direction={["column", "row", null, "column"]}>
        <Login />
        <Registration />
      </Stack>
    </Stack>
  );
};

export default Auth;
