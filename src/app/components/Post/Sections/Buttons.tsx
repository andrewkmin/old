import {
  Box,
  Button,
  Flex,
  Icon,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";
import { BiConversation } from "react-icons/bi";
import CommentsModal from "../components/CommentsModal";

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
        {/* Heart button */}
        <Button
          w={"full"}
          size={"md"}
          rightIcon={
            <Flex alignItems={"center"} justifyContent={"center"}>
              <Icon fontSize={"15px"} as={FiHeart} alignItems={"center"} />
            </Flex>
          }
        >
          Heart
        </Button>

        {/* Comment button */}
        <Button
          w={"full"}
          size={"md"}
          onClick={onCommentsModalOpen}
          rightIcon={<BiConversation size={"16px"} />}
        >
          Comment
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
