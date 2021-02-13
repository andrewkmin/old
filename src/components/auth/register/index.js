import { Box, useDisclosure } from "@chakra-ui/react";
import ModalTriggerButton from "./buttons/ModalTrigger";
import RegistrationModal from "./modals/RegistrationModal";

const Register = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Box w={"sm"}>
      <ModalTriggerButton registrationOnOpen={onOpen} />
      <RegistrationModal onClose={onClose} isOpen={isOpen} />
    </Box>
  );
};

export default Register;
