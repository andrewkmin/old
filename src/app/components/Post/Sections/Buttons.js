import { BiChat, BiShare } from "react-icons/bi";
import { Box, Button, Stack } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const Bottom = ({ post, states, setState }) => {
  // TODO: Implement
  const heartPost = async () => {};
  // TODO: Implement
  const unheartPost = async () => {};

  return (
    <Box>
      {/* Button flex */}
      <Stack spacing={2} direction={["column", "row"]}>
        {/* Heart button */}
        <Button
          w={"full"}
          size={"sm"}
          // isLoading={heartButtonLoading}
          colorScheme={states.hearted ? "red" : null}
          loadingText={states.hearted ? "Unhearting" : "Hearting"}
          leftIcon={states.hearted ? <AiFillHeart /> : <AiOutlineHeart />}
          onClick={states.hearted ? () => unheartPost() : () => heartPost()}
        >
          {states.hearted ? "Unheart" : "Heart"}
        </Button>

        {/* Comment button */}
        <Button size={"sm"} leftIcon={<BiChat />} w={"full"}>
          Comment
        </Button>

        {/* Share button */}
        <Button size={"sm"} leftIcon={<BiShare />} w={"full"}>
          Share
        </Button>
      </Stack>
    </Box>
  );
};

export default Bottom;
