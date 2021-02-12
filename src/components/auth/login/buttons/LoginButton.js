import { BiLogIn } from "react-icons/bi";
import { Button, FormControl, InputGroup } from "@chakra-ui/react";
import { isMobile } from "react-device-detect";

const LoginButton = ({ isSubmitting }) => {
  return (
    <FormControl ps={isMobile ? 5 : null} pe={isMobile ? 5 : null}>
      <InputGroup>
        <Button
          _focus={false}
          type={"submit"}
          loadingText={"Logging you In"}
          m={1}
          w={"full"}
          size={"md"}
          colorScheme={"blue"}
          isLoading={isSubmitting}
          leftIcon={<BiLogIn />}
        >
          Log In
        </Button>
      </InputGroup>
    </FormControl>
  );
};

export default LoginButton;
