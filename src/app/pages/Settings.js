import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import DataContext from "../data/data.context";
import Theme from "../components/Settings/Theme";
import Avatar from "../components/Settings/Avatar";
import { Box, Center, chakra, Stack, Text } from "@chakra-ui/react";

// The settings page
const Settings = () => {
  const { userData } = useContext(DataContext);

  return (
    <>
      <Helmet>
        <title>Settings - Usocial</title>
      </Helmet>

      <Box>
        <Stack spacing={10}>
          <Center>
            <Box pb={2} borderBottom={"2px"} w={["xl", "2xl", "3xl"]}>
              <Text fontFamily={"ubuntu bold"} fontSize={["xl", "2xl", "3xl"]}>
                Account Settings
              </Text>
            </Box>
          </Center>

          <Stack spacing={5}>
            <Theme />
            <Avatar />
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Settings;
