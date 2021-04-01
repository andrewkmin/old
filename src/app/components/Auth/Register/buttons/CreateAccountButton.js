import { Button } from "@chakra-ui/react";

const CreateAccountButton = ({ isSubmitting }) => {
  return (
    <Button
      colorScheme={"teal"}
      type={"submit"}
      mt={2}
      mb={2}
      w={"full"}
      isLoading={isSubmitting}
      loadingText={"Creating an account"}
    >
      Create Account
    </Button>
  );
};

export default CreateAccountButton;
