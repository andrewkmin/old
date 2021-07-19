import { Box, Stack } from "@chakra-ui/react";
import Avatar from "../components/Settings/Avatar";

// The settings page
const Settings = () => {
  return (
    <Box>
      <Stack spacing={5}>
        <Avatar />
      </Stack>
    </Box>
  );
};

export default Settings;
