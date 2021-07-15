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
        <Button bgColor={"purple.400"} colorScheme={"purple"}>
          Follow
        </Button>
        <Button bgColor={"purple.300"} colorScheme={"purple"}>
          Add friend
        </Button>
      </Stack>
    </Box>
  );
};

export default Actions;
