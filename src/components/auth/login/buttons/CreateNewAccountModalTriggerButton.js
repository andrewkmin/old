import { Button, FormControl, InputGroup } from "@chakra-ui/react";
import { RiUser3Line } from "react-icons/ri";
import { isMobile } from "react-device-detect";

const CreateNewAccountModalTriggerButton = ({ registrationOnOpen }) => {
  return (
    <FormControl ps={isMobile ? 5 : null} pe={isMobile ? 5 : null}>
      <InputGroup>
        <Button
          type={"button"}
          _focus={false}
          size={"md"}
          w={"full"}
          onClick={registrationOnOpen}
          colorScheme={"teal"}
          leftIcon={<RiUser3Line />}
        >
          Create New Account
        </Button>
      </InputGroup>
    </FormControl>
  );
};

export default CreateNewAccountModalTriggerButton;
