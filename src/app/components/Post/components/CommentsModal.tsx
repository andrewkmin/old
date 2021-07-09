import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Avatar,
  Stack,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { Post } from "../../../types/index";
import { formatDistanceToNow } from "date-fns";

interface CommentsModalProps {
  data: Post;
  isOpen: boolean;
  onClose: () => void;
}

const CommentsModal = ({ data, isOpen, onClose }: CommentsModalProps) => {
  return (
    <Box>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comments on {data?.user?.first_name}'s post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {data?.comments?.map((comment) => {
              return (
                <Box
                  border={"2px"}
                  p={2}
                  rounded={"lg"}
                  borderColor={"gray.300"}
                >
                  <Stack>
                    <Box>
                      <Stack direction={"row"}>
                        <Avatar src={comment?.user?.avatar} />
                        <Stack>
                          <Stack
                            fontSize={"md"}
                            direction={"row"}
                            alignItems={"center"}
                            fontWeight={"semibold"}
                            justifyContent={"space-between"}
                          >
                            <Stack direction={"row"}>
                              <Text>{comment?.user?.first_name}</Text>
                              <Text>|</Text>
                              <Text>
                                {formatDistanceToNow(
                                  new Date(comment?.created_at),
                                  { addSuffix: true, includeSeconds: true }
                                )}
                              </Text>
                            </Stack>
                            <IconButton aria-label={"Like Comment"} />
                          </Stack>
                          <Text>{comment?.body}</Text>
                        </Stack>
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
              );
            })}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme={"blue"} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CommentsModal;
