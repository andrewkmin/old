import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  Text,
  ModalBody,
  Flex,
} from "@chakra-ui/react";
import RegistrationForm from "./forms/RegistrationForm";

const Register = ({ registrationIsOpen, registrationOnClose }) => {
  return (
    <Modal onClose={registrationOnClose} isOpen={registrationIsOpen} isCentered>
      <ModalOverlay />
      <ModalContent m={2}>
        <ModalHeader>
          <Flex>
            <Text fontWeight={"bold"}>Sign Up</Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton _focus={false} />
        <ModalBody>
          <RegistrationForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Register;
