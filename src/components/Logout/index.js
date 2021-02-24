import { Redirect } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { Box, Center, Spinner, Text } from "@chakra-ui/react";

import { useLogout } from "../../api/hooks";
import DataContext from "../../data/data.context";

const LogoutComponent = () => {
  const Logout = useRef(() => {});
  const { setState } = useContext(DataContext);
  const { data, isFetched, isFetching } = useLogout();

  Logout.current = () => {
    setState({
      userData: {},
      authenticated: false,
    });
  };

  useEffect(() => Logout.current(), []);

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
