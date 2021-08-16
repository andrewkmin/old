import { NavLink } from "react-router-dom";
import { Box, Center, Text } from "@chakra-ui/react";

const Forgot = () => {
  return (
    <Box>
      <Box>
        <Center>
          <Text
            as={NavLink}
            to={"?forgot=yes"}
            fontWeight={"thin"}
            userSelect={"none"}
            color={"purple.400"}
            fontFamily={"ubuntu bold"}
          >
            Forgot your password?
          </Text>
        </Center>
      </Box>
    </Box>
  );
};

export default Forgot;
