import { Button, FormControl, InputGroup } from "@chakra-ui/react";

const CreateNewAccountModalTriggerButton = ({ registrationOnOpen }) => {
  return (
    <FormControl>
      <InputGroup>
        <Button
          size={"md"}
          w={"full"}
          onClick={registrationOnOpen}
          colorScheme={"teal"}
        >
          Create New Account
        </Button>
      </InputGroup>
    </FormControl>
  );
};

export default CreateNewAccountModalTriggerButton;
