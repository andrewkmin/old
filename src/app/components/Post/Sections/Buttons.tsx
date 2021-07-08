import { BiShare } from "react-icons/bi";
import { PostProps } from "../../../types/index";
import CommentsModal from "../components/CommentsModal";
import { AiFillGift, AiOutlineComment } from "react-icons/ai";
import { Box, Button, Stack, useDisclosure, Portal } from "@chakra-ui/react";

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
        {/* Heart button */}

        {/* Comment button */}
        <Button
          w={"full"}
          size={"sm"}
          onClick={onCommentsModalOpen}
          rightIcon={<AiOutlineComment size={"15px"} />}
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

      <Portal>
        <CommentsModal
          data={post}
          isOpen={commentsModalIsOpen}
          onClose={commentsModalOnClose}
        />
      </Portal>
    </Box>
  );
};

export default Bottom;
