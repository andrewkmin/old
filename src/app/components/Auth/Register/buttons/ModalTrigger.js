import { Button, FormControl, InputGroup } from "@chakra-ui/react";

// Modal trigger triggers the registration modal
const ModalTrigger = ({ registrationOnOpen }) => {
  return (
    <FormControl>
      <InputGroup>
        <Button
          w={"full"}
          size={"md"}
          colorScheme={"teal"}
          borderRadius={"full"}
          onClick={registrationOnOpen}
        >
          Create New Account
        </Button>
      </InputGroup>
    </FormControl>
  );
};

export default ModalTrigger;
