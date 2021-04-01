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

const RegistrationModal = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent m={2}>
          <ModalHeader>
            <Flex>
              <Text fontWeight={"bold"}>Sign Up</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RegistrationForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RegistrationModal;
