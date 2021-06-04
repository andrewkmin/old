import { useHistory } from "react-router";
import { useContext, useEffect } from "react";
import { Box, Center, Spinner, Text, useToast } from "@chakra-ui/react";

import axios from "../../api/axios";
import DataContext from "../../data/data.context";

const LogoutComponent = () => {
  const toast = useToast();
  const history = useHistory();
  const { setState } = useContext(DataContext);

  useEffect(() => {
    const logout = async () => {
      const response = await axios.post("/auth/logout");

      switch (response.status) {
        case 200: {
          setState({ userData: {}, authenticated: false, loading: false });
          return history.push("/welcome");
        }
        default: {
          toast({
            title: "There was an error",
            status: "error",
            duration: 2000,
            isClosable: false,
          });
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

export default LogoutComponent;
