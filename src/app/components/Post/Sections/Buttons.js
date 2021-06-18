import { BiShare } from "react-icons/bi";
import { Box, Button, Stack } from "@chakra-ui/react";
import { AiFillGift, AiOutlineComment } from "react-icons/ai";

const Bottom = ({ post, states, setState }) => {
  // TODO: Implement
  // const heartPost = async () => {};
  // TODO: Implement
  // const unheartPost = async () => {};

  return (
    <Box>
      {/* Button flex */}
      <Stack spacing={2} direction={["column", "row"]}>
        {/* Heart button */}
    
        {/* Comment button */}
        <Button
          size={"sm"}
          rightIcon={<AiOutlineComment size={"15px"} />}
          w={"full"}
        >
          Comment
        </Button>

        {/* Share button */}
        <Button size={"sm"} rightIcon={<BiShare size={"15px"} />} w={"full"}>
          Share
        </Button>
        {/* AiFillGift */}

        {/* Share button */}
        <Button size={"sm"} rightIcon={<AiFillGift size={"15px"} />} w={"full"}>
          Gift
        </Button>
      </Stack>
    </Box>
  );
};

export default Bottom;
