import { format } from "date-fns";
import { Helmet } from "react-helmet-async";
import Auth from "../components/Auth/index";
import {
  Box,
  Center,
  chakra,
  Flex,
  // chakra,
  // Flex,
  Link,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  // Spacer,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import Confetti from "react-confetti";
import { MdCheckCircle } from "react-icons/md";
import { motion } from "framer-motion";

const FirstTimeModal = () => {
  const { onClose, isOpen, onOpen } = useDisclosure();

  useEffect(() => {
    onOpen();
    return () => onClose();
  }, [onOpen, onClose]);

  return (
    <>
      <Confetti
        style={{
          zIndex: "999999",
        }}
        recycle={false}
        numberOfPieces={1000}
        width={window.innerWidth}
        height={window.innerHeight}
      />

      <Modal onClose={onClose} size={"xl"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent mx={2} pb={3.5}>
          <ModalHeader>Greetings from Usocial team 👋</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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

const Welcome = () => {
  const isFirstTime = JSON.parse(localStorage.isFirstTime || false);

  localStorage.isFirstTime = true;

  return (
    <>
      <Helmet>
        {/* Main Meta Tags */}
        <title>Welcome to Usocial</title>
        <meta name="language" content="English" />
        <meta property="locale" content="en_US" />
        <meta name="robots" content="index, follow" />
        <meta name="revisit-after" content="1 days" />
        <meta name="title" content="Welcome to Usocial" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
          name="description"
          content="Usocial is a next-gen privacy oriented social media networking platform."
        />
        <meta
          name="keywords"
          content="social media website, social, media, videos, images, text, comment"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Usocial" />
        <meta property="og:title" content="Welcome to Usocial" />
        <meta
          property="og:description"
          content="Usocial is a next-gen privacy oriented social media networking platform."
        />

        {/* Twitter Meta Tags */}
        <meta property="twitter:type" content="website" />
        <meta property="twitter:locale" content="en_US" />
        <meta property="twitter:site_name" content="Usocial" />
        <meta property="twitter:title" content="Welcome to Usocial" />
        <meta
          property="twitter:description"
          content="Usocial is a next-gen privacy oriented social media networking platform."
        />
      </Helmet>

      <Box minH={"100vh"}>
        {isFirstTime && <FirstTimeModal />}

        <Flex minH={"90vh"} alignItems={"center"} justifyContent={"center"}>
          <Auth />
        </Flex>

        <Center ms={2} pe={3} pb={3} pos={"absolute"} right={0} bottom={0}>
          <Stack color={"gray.400"} direction={"row"}>
            <Link fontSize={"sm"}>Privacy Policy</Link>
            <Text fontSize={"sm"}>•</Text>
            <Link fontSize={"sm"}>Terms of Service</Link>
            <Text fontSize={"sm"}>•</Text>
            <Link fontSize={"sm"}>More</Link>
            <Text fontSize={"sm"}>•</Text>
            <Text fontWeight={"semibold"} fontSize={"sm"}>
              &copy; Usocial {format(Date.now(), "yyyy")}
            </Text>
          </Stack>
        </Center>
      </Box>
    </>
  );
};

export default Welcome;
