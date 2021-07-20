import { AiFillGift } from "react-icons/ai";
import { PostProps } from "../../../types/index";
import CommentsModal from "../components/CommentsModal";
import { BiRepost, BiConversation } from "react-icons/bi";
import { Box, Button, Stack, useDisclosure } from "@chakra-ui/react";

const Bottom = ({ data: post }: PostProps) => {
  // TODO: Implement
  // const heartPost = async () => {};
  // TODO: Implement
  // const unheartPost = async () => {};

  const {
    onOpen: onCommentsModalOpen,
    isOpen: commentsModalIsOpen,
    onClose: commentsModalOnClose,
  } = useDisclosure();

  return (
    <Box>
      {/* Button flex */}
      <Stack spacing={2} direction={["column", "row"]}>
        {/* Comment button */}
        <Button
          w={"full"}
          size={"md"}
          onClick={onCommentsModalOpen}
          rightIcon={<BiConversation size={"16px"} />}
        >
          Comment
        </Button>

        {/* Share button */}
        <Button size={"md"} rightIcon={<AiFillGift size={"16px"} />} w={"full"}>
          Gift
        </Button>

        {/* Share button */}
        <Button size={"md"} w={"full"} rightIcon={<BiRepost size={"18px"} />}>
          Repost
        </Button>
      </Stack>

      <CommentsModal
        data={post}
        isOpen={commentsModalIsOpen}
        onClose={commentsModalOnClose}
      />
    </Box>
  );
};

export default Bottom;
