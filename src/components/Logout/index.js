import { useHistory } from "react-router";
import { useContext, useEffect } from "react";
import { Box, Center, Spinner, Text } from "@chakra-ui/react";

import _axios from "../../api/_axios";
import DataContext from "../../data/data.context";

const LogoutComponent = () => {
  const history = useHistory();
  const { setState } = useContext(DataContext);

  useEffect(() => {
    const logout = async () => {
      try {
        const { data } = await _axios.post("/auth/logout");

        if (!data?.error) {
          history.push("/welcome");
          return setState({ userData: {}, authenticated: false });
        } else return null;
      } catch (error) {
        return null;
      }
    };
    logout();

    return () => {};
  }, [history, setState]);

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
