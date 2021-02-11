import { Button } from "@chakra-ui/react";
import { RiUser3Line } from "react-icons/ri";

const CreateNewAccountModalTriggerButton = ({ registrationOnOpen }) => {
  return (
    <Button
      type={"button"}
      _focus={false}
      size={"md"}
      onClick={registrationOnOpen}
      colorScheme={"teal"}
      leftIcon={<RiUser3Line />}
    >
      Create New Account
    </Button>
  );
};

export default CreateNewAccountModalTriggerButton;
