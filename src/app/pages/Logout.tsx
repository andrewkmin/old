import {
  Box,
  Center,
  Flex,
  Heading,
  Spinner,
  Stack,
  useToast,
} from "@chakra-ui/react";
import axios from "../api/axios";
import { useHistory } from "react-router";
import { useContext, useEffect } from "react";
import DataContext from "../data/data.context";

// The logout page
const Logout = () => {
  const toast = useToast({ position: "bottom-left" });
  const history = useHistory();
  const { setState } = useContext(DataContext);

  useEffect(() => {
    const logout = async () => {
      // Sending the logout request
      const { status } = await axios.post("/auth/logout");

      // Checking response status
      if (status === 200) {
        // Clear userData, falsify authenticated and loading values
        setState({ userData: null, authenticated: false, loading: false });
        // Return to the main page
        return history.push("/welcome");
      } else return history.push("/");
    };

    logout();
    return () => {};
  }, [history, setState, toast]);

  return (
    <Flex alignItems={"center"} justifyContent={"center"} minH={"100vh"}>
      <Box>
        <Stack spacing={6}>
          <Center>
            <Heading color={"purple.500"} fontWeight={"thin"} fontSize={"2xl"}>
              Logging you out
            </Heading>
          </Center>

          <Center>
            <Spinner size={"lg"} thickness={"3px"} color={"purple.400"} />
          </Center>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Logout;
