import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Flex,
  Spinner,
  Center,
} from "@chakra-ui/react";
import Comment from "./Comment";
import { useContext, useState } from "react";
import CreateCommentForm from "./CreateCommentForm";
import { Comment as CommentType } from "../../../types";
import PostContext from "../../../contexts/post.context";
import { useFetchInfiniteResource } from "../../../utils/hooks";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { useEffect } from "react";
import { useInfiniteQuery } from "react-query";

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommentsModal = ({ isOpen, onClose }: CommentsModalProps) => {
  const { post } = useContext(PostContext);
  const [enabled, setEnabled] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);

  return (
    <Box>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent rounded={"2xl"} m={2}>
          <ModalHeader>Comments on {post?.user?.first_name}'s post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* {isLoading && (
              <Box>
                <Flex
                  h={"100%"}
                  w={"100%"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Spinner />
                </Flex>
              </Box>
            )}

            {data?.length === 0 ? (
              <Text>There are no comments yet</Text>
            ) : (
              data?.map((comment) => {
                return <Comment key={comment.id} data={comment} />;
              })
            )}

            {isFetchingNextPage && (
              <Center p={2}>
                <Spinner />
              </Center>
            )} */}
          </ModalBody>

          <ModalFooter justifyContent={"space-between"}>
            <CreateCommentForm />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CommentsModal;
