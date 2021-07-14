import { Button, FormControl, InputGroup } from "@chakra-ui/react";

interface LoginButtonProps {
  isSubmitting: boolean;
}

const LoginButton = ({ isSubmitting }: LoginButtonProps) => {
  return (
    <FormControl>
      <InputGroup>
        <Button
          w={"full"}
          size={"lg"}
          type={"submit"}
          rounded={"full"}
          fontWeight={"thin"}
          fontStyle={"normal"}
          colorScheme={"purple"}
          isLoading={isSubmitting}
          fontFamily={"ubuntu bold"}
          loadingText={"Logging in"}
        >
          Log in
        </Button>
      </InputGroup>
    </FormControl>
  );
};

export default LoginButton;
