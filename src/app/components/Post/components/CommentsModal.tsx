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
import { useContext } from "react";
import CreateCommentForm from "./CreateCommentForm";
import PostContext from "../../../contexts/post.context";
import { Comment as CommentType } from "../../../types/index";

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommentsModal = ({ isOpen, onClose }: CommentsModalProps) => {
  const { post: data } = useContext(PostContext);
  const { comments } = data;

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
          <ModalHeader>Comments on {data?.user?.first_name}'s post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* {comments?.length === 0 ? (
              <Text>There are no comments yet</Text>
            ) : (
              comments?.map((comment: CommentType) => {
                return <Comment key={comment.id} data={comment} />;
              })
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
