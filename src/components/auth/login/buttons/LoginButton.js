import { BiLogIn } from "react-icons/bi";
import { Button } from "@chakra-ui/react";

const LoginButton = ({ isSubmitting }) => {
  return (
    <Button
      _focusVisible={false}
      _focus={false}
      _focusWithin={false}
      type="submit"
      loadingText="Logging you In"
      m={1}
      colorScheme="blue"
      size="md"
      isLoading={isSubmitting}
      leftIcon={<BiLogIn />}
    >
      Log In
    </Button>
  );
};

export default LoginButton;
