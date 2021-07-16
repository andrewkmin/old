import { User } from "../../../types";
import { Box, Button, Stack } from "@chakra-ui/react";

interface ActionsProps {
  user: User;
  friendshipData: number;
}

const Actions = ({ user, friendshipData }: ActionsProps) => {
  const followRequest = async () => {};

  return (
    <Button
      w={"full"}
      size={"lg"}
      rounded={"full"}
      bgColor={"purple.400"}
      colorScheme={"purple"}
    >
      Follow
    </Button>
  );
};

export default Actions;
