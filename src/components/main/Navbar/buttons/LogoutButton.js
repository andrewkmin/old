import { Link } from "react-router-dom";
import { Button, Box } from "@chakra-ui/react";

const LogoutButton = () => {
  return (
    <Box px={2} py={1}>
      <Button as={Link} to={"/logout"} colorScheme={"red"} w={"full"}>
        Logout
      </Button>
    </Box>
  );
};

export default LogoutButton;
