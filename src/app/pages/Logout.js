import axios from "../api/axios";
import { useHistory } from "react-router";
import { useContext, useEffect } from "react";
import DataContext from "../data/data.context";
import { Box, Center, Spinner, Text, useToast } from "@chakra-ui/react";

// The logout page
const Logout = () => {
  const toast = useToast();
  const history = useHistory();
  // For updating global user state
  const { setState } = useContext(DataContext);

  useEffect(() => {
    const logout = async () => {
      // Sending the logout request
      const response = await axios.post("/auth/logout");

      // Checking response status
      switch (response.status) {
        // If everything is ok
        case 200: {
          // Clear userData, falsify authenticated and loading values
          setState({ userData: {}, authenticated: false, loading: false });
          // Return to the main page
          return history.push("/welcome");
        }
        // If something goes wrong
        default: {
          // Notify
          toast({
            title: "There was an error",
            status: "error",
            duration: 2000,
            isClosable: false,
          });
          // Redirect back
          return history.push("/");
        }
      }
    };

    logout();
    return () => {};
  }, [history, setState, toast]);

  return (
    <Box>
      <Center>
        <Text fontWeight="bold" fontSize="xl">
          Logging you out
        </Text>
      </Center>
      <Center>
        <Spinner />
      </Center>
    </Box>
  );
};

export default Logout;
