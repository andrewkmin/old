import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { useLogout } from "../auth/verification";
import { Box, Center, Spinner, Text } from "@chakra-ui/react";

import _DataContext from "../data/data.context";
import _AuthContext from "../auth/auth.context";

const LogoutComponent = () => {
  const DataContext = useContext(_DataContext);
  const AuthContext = useContext(_AuthContext);
  const { data, isFetched, isFetching } = useLogout();

  if (!isFetching) {
    if (isFetched) {
      if (!data.error) {
        DataContext.setUserData({});
        AuthContext.setAuthenticated(false);
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
          <Spinner />
        </Center>
      </Box>
    );
  }
};

export default LogoutComponent;
