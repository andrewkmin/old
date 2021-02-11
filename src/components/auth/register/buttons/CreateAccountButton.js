import { Button } from "@chakra-ui/react";

const CreateAccountButton = ({ isSubmitting }) => {
  return (
    <Button
      _focusVisible={false}
      _focus={false}
      _focusWithin={false}
      colorScheme={"teal"}
      type={"submit"}
      mt={2}
      mb={2}
      isLoading={isSubmitting}
      loadingText={"Creating an account"}
    >
      Create Account
    </Button>
  );
};

export default CreateAccountButton;
