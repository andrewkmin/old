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
          <Box>
            <Center>
              <Box pb={2} borderColor={"green"} borderBottom={"2px"}>
                <Text fontSize={["xl", "2xl", "3xl"]}>
                  Welcome to your settings,{" "}
                  <chakra.span userSelect={"none"} fontWeight={"semibold"}>
                    {userData?.firstName}
                  </chakra.span>
                  .
                </Text>
              </Box>
            </Center>
          </Box>

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
