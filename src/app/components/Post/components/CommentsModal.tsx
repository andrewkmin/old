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
} from "@chakra-ui/react";
import Comment from "./Comment";
import { useState, useMemo } from "react";
// import CreateCommentForm from "./CreateCommentForm";
import { Post, Comment as CommentType } from "../../../types/index";

interface CommentsModalProps {
  data: Post;
  isOpen: boolean;
  onClose: () => void;
}

const CommentsModal = ({ data, isOpen, onClose }: CommentsModalProps) => {
  const [comments, setComments] = useState<CommentType[]>();

  useMemo(() => {
    setComments(data.comments);
  }, [data]);

  return (
    <Box>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent m={2}>
          <ModalHeader>Comments on {data?.user?.first_name}'s post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {comments?.length === 0 ? (
              <Text>There are no comments yet</Text>
            ) : (
              comments?.map((comment) => {
                return <Comment key={comment.id} data={comment} />;
              })
            )}
          </ModalBody>

          <ModalFooter justifyContent={"space-between"}>
            {/* <CreateCommentForm setComments={setComments} /> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CommentsModal;
