import { User } from "../../../types";
import { Box, Button, Stack } from "@chakra-ui/react";

interface ActionsProps {
  user?: User;
  friendshipData: number;
}

const Actions = ({ user, friendshipData }: ActionsProps) => {
  return (
    <Box>
      <Stack direction={["column", "row"]}>
        <Button colorScheme={"blue"}>Follow</Button>
        <Button colorScheme={"teal"}>Add friend</Button>
      </Stack>
    </Box>
  );
};

export default Actions;
