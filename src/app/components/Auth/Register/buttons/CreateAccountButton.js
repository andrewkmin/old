import { Button } from "@chakra-ui/react";

// Button component used for submitting form and sending the request
const CreateAccountButton = ({ isSubmitting }) => {
  return (
    <Button
      colorScheme={"teal"}
      type={"submit"}
      mt={2}
      mb={2}
      w={"full"}
      rounded={"full"}
      isLoading={isSubmitting}
      loadingText={"Creating an account"}
    >
      Create Account
    </Button>
  );
};

export default CreateAccountButton;
