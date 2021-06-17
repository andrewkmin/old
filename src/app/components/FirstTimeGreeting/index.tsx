import {
  chakra,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import Confetti from "react-confetti";
import { MdCheckCircle } from "react-icons/md";

const FirstTimeGreeting = () => {
  const { onClose, isOpen, onOpen } = useDisclosure();

  useEffect(() => {
    onOpen();
    return () => onClose();
  }, [onOpen, onClose]);

  return (
    <>
      <Confetti
        style={{
          zIndex: 99999,
        }}
        recycle={false}
        numberOfPieces={1000}
        width={window.innerWidth}
        height={window.innerHeight}
      />

      <Modal onClose={onClose} size={"xl"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent mx={2} pb={3.5}>
          <ModalHeader>Greetings from the Usocial team 👋</ModalHeader>
          <ModalCloseButton />
          <ModalBody userSelect={"none"}>
            <Stack spacing={3}>
              <Text>
                Hi and welcome to{" "}
                <chakra.span fontWeight={"bold"} color={"teal.500"}>
                  Usocial
                </chakra.span>
                , the first social media website aimed for privacy protection on
                the Internet.
                {"\n"}
                We're pleased to have a user like{" "}
                <chakra.span fontWeight={"bold"}>YOU</chakra.span> and we hope
                that your experience on our platform will be fantastic. It's not
                necessary but will be nice if you follow these rules if you join
                :)
              </Text>

              <List>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color={"green.500"} />
                  Be nice to others
                </ListItem>

                <ListItem>
                  <ListIcon as={MdCheckCircle} color={"green.500"} />
                  Don't harass others based on their opinion
                </ListItem>
              </List>

              <Text fontWeight={"semibold"}>Thanks for reading 🙌</Text>
              <Text fontWeight={"bold"} fontSize={"sm"}>
                CEO and Founder, Michael Grigoryan
              </Text>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FirstTimeGreeting;
