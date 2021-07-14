import { Button } from "@chakra-ui/react";

interface CreateAccountButtonProps {
  isSubmitting: boolean;
}

// Button component used for submitting form and sending the request
const CreateAccountButton = ({ isSubmitting }: CreateAccountButtonProps) => {
  return (
    <Button
      w={"full"}
      size={"lg"}
      type={"submit"}
      rounded={"full"}
      fontWeight={"thin"}
      fontStyle={"normal"}
      colorScheme={"purple"}
      bgColor={"purple.400"}
      isLoading={isSubmitting}
      fontFamily={"ubuntu bold"}
      loadingText={"Creating an account"}
    >
      Create your account
    </Button>
  );
};

export default CreateAccountButton;
