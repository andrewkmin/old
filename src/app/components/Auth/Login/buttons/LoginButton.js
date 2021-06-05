import { Button, FormControl, InputGroup } from "@chakra-ui/react";

const LoginButton = ({ isSubmitting }) => {
  return (
    <FormControl>
      <InputGroup>
        <Button
          type={"submit"}
          loadingText={"Logging you In"}
          w={"full"}
          size={"md"}
          colorScheme={"blue"}
          isLoading={isSubmitting}
        >
          Login
        </Button>
      </InputGroup>
    </FormControl>
  );
};

export default LoginButton;
