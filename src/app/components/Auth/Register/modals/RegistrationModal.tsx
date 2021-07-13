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
import RegistrationForm from "../forms/RegistrationForm";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationModal = ({ isOpen, onClose }: RegistrationModalProps) => {
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent rounded={"2xl"} m={2}>
          <ModalHeader>
            <Flex>
              <Text fontWeight={"semibold"}>Sign Up</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p={3.5}>
            <RegistrationForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RegistrationModal;
