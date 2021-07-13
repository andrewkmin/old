import { Button, FormControl, InputGroup } from "@chakra-ui/react";

interface ModalTriggerProps {
  registrationOnOpen: () => void;
}

// Modal trigger triggers the registration modal
const ModalTrigger = ({ registrationOnOpen }: ModalTriggerProps) => {
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
