import { Box, Center, Divider, Stack, Text } from "@chakra-ui/react";

import ProfileSection from "./Sections/ProfileSection";

const Settings = () => {
  return (
    <Box m={10}>
      <Center>
        <Box w={"lg"}>
          <Box>
            <Text fontSize={"3xl"} fontWeight={"bold"}>
              Settings
            </Text>
            <Divider />
          </Box>

          <Stack pt={10} spacing={5}>
            <ProfileSection />
            <Divider />
          </Stack>
        </Box>
      </Center>
    </Box>
  );
};

export default Settings;
