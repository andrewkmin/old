import { Box, Center, useDisclosure } from "@chakra-ui/react";

import Login from "../components/auth/login/index";
import Register from "../components/auth/register/index";

const Welcome = () => {
  const {
    isOpen: registrationIsOpen,
    onOpen: registrationOnOpen,
    onClose: registrationOnClose,
  } = useDisclosure();

  return (
    <Box>
      <Center>
        <Login registrationOnOpen={registrationOnOpen} />
        <Register
          registrationIsOpen={registrationIsOpen}
          registrationOnClose={registrationOnClose}
          registrationOnOpen={registrationOnOpen}
        />
      </Center>
    </Box>
  );
};

export default Welcome;
