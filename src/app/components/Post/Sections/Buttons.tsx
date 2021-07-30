import CommentsModal from "../components/CommentsModal";
import { BiRepost, BiConversation } from "react-icons/bi";
import { Box, Button, Stack, useDisclosure } from "@chakra-ui/react";

const Bottom = () => {
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
        <Button size={"md"} w={"full"} rightIcon={<BiRepost size={"18px"} />}>
          Repost
        </Button>
      </Stack>

      <CommentsModal
        isOpen={commentsModalIsOpen}
        onClose={commentsModalOnClose}
      />
    </Box>
  );
};

export default Bottom;
