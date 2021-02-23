import { Redirect } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Box, Center, Spinner, Text } from "@chakra-ui/react";

import { useLogout } from "../api/hooks";
import DataContext from "../data/data.context";

const LogoutComponent = () => {
  const { setState } = useContext(DataContext);
  const { data, isFetched, isFetching } = useLogout();

  useEffect(() => {
    setState({
      userData: {},
      authenticated: false,
    });
  }, [setState]);

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
