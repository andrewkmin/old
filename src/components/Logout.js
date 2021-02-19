import { useContext, useEffect, useRef } from "react";
import { useLogout } from "../api/hooks";
import { Redirect } from "react-router-dom";
import { Box, Center, Spinner, Text } from "@chakra-ui/react";

import DataContext from "../data/data.context";
import AuthContext from "../auth/auth.context";

const LogoutComponent = () => {
  const logout = useRef(() => {});
  const { setUserData } = useContext(DataContext);
  const { data, isFetched, isFetching } = useLogout();
  const { setAuthenticated } = useContext(AuthContext);
  logout.current = () => {
    setUserData({});
    setAuthenticated(false);
  };

  useEffect(() => {
    logout.current();
  }, []);

  if (!isFetching) {
    if (isFetched) {
      if (!data.error) {
        return <Redirect to="/welcome" />;
      } else {
        return <Redirect to="/" />;
      }
    }
  } else {
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
  }
};

export default LogoutComponent;
