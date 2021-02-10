import {
  Input,
  Box,
  Flex,
  Center,
  Avatar,
  Text,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  MenuGroup,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Divider,
  useToast,
  useColorModeValue,
  useDisclosure,
  ModalFooter,
} from "@chakra-ui/react";
import { useRef } from "react";
import Asyncoload from "asyncoload";
import _axios from "../api/_axios";
import CommentList from "./CommentList";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import _DataContext from "../data/data.context";
import { BiChat, BiShare } from "react-icons/bi";
import { FiMoreHorizontal } from "react-icons/fi";
import verification from "../auth/verification.js";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import React, { useEffect, useState, useContext } from "react";

const Post = ({ data: post }) => {
  const Toast = useToast();
  const setData = useRef(() => {});
  const DataContext = useContext(_DataContext);

  const {
    isOpen: commentModalIsOpen,
    onOpen: commentModalOnOpen,
    onClose: commentModalOnClose,
  } = useDisclosure();

  const {
    isOpen: deletePostAlertIsOpen,
    onOpen: deletePostAlertOnOpen,
    onClose: deletePostAlertOnClose,
  } = useDisclosure();

  // Post parameter states
  const [saved, setSaved] = useState(false);
  const [hearted, setHearted] = useState(false);
  const [loading, setLoading] = useState(false);

  // An interface for interacting with post
  const PostActions = {
    async heartPost() {
      setLoading(true);
      const { data } = await _axios.put(
        `/api/posts/heart/?postId=${post?.postData?._id}`
      );

      if (!data.error) {
        setLoading(false);
        setHearted(true);
      } else {
        setLoading(false);
        Toast({
          title: "Whoops, something bad happened!",
          description: "There was an error while hearting the post",
          isClosable: true,
          duration: 3000,
          status: "error",
        });
      }
    },

    async unheartPost() {
      setLoading(true);
      const { data } = await _axios.put(
        `/api/posts/unheart/?postId=${post?.postData?._id}`
      );

      if (!data.error) {
        setLoading(false);
        setHearted(false);
      } else {
        setLoading(false);
        Toast({
          title: "Whoops, something bad happened!",
          description: "There was an error while unhearting the post",
          isClosable: true,
          duration: 3000,
          status: "error",
        });
      }
    },

    async deletePost() {
      const postData = post?.postData;
      const { data: responseData } = await _axios.delete(
        `/api/posts/delete/?postId=${postData._id}`
      );

      if (!responseData.error) {
        Toast({
          title: "Post deleted",
          duration: 1000,
          isClosable: true,
        });
      } else {
        Toast({
          title: responseData.error.toString(),
          duration: 1000,
          isClosable: true,
        });
      }
    },

    async sharePost() {
      // TODO: Implement post sharing
    },
  };

  const createComment = async (event) => {
    event.preventDefault();
    const PAYLOAD = {
      comment: event.currentTarget.elements.comment.value,
    };
    const { data } = await _axios.post(
      `/api/posts/comments/create/?postId=${post?.postData?._id}`,
      PAYLOAD
    );

    if (!data.error) {
      return Toast({
        title: "There was an error while posting your comment",
        duration: 3000,
        status: "error",
        isClosable: false,
      });
    }

    return data;
  };

  // Setting the states
  setData.current = () => {
    if (post?.postData?.hearts?.includes(DataContext.userData._id)) {
      setHearted(true);
    }

    if (post?.authorData?.saved?.includes(DataContext.userData._id)) {
      setSaved(true);
    }
  };

  useEffect(() => {
    setData.current();
  }, []);

  return (
    <Box
      key={post?.postData?._id}
      mb={2}
      p={4}
      border="1px"
      boxShadow="md"
      borderRadius="md"
      borderColor={useColorModeValue("gray.300", "gray.700")}
    >
      <Box>
        <Flex>
          <Box>
            <Center>
              <Link to={`/users/${post?.authorData?._id}`}>
                <Flex>
                  <Avatar src={post?.authorData?.pictureUrl} />
                  <Center>
                    <Text fontWeight="semibold" ms={2} color="blue.500">
                      {post?.authorData?.fullName}
                    </Text>
                  </Center>
                </Flex>
              </Link>
            </Center>
          </Box>

          <Spacer />

          <Center>
            <Menu>
              <IconButton as={MenuButton} isRound _focus={false}>
                <Center>
                  <FiMoreHorizontal />
                </Center>
              </IconButton>
              <MenuList>
                <MenuGroup title="Actions">
                  {post?.postData?.authorId === verification.id && (
                    <MenuItem
                      fontWeight="semibold"
                      onClick={deletePostAlertOnOpen}
                    >
                      <Box mr={1}>
                        <FaTrash color="red" />
                      </Box>
                      Delete Post
                    </MenuItem>
                  )}
                  <MenuItem fontWeight="semibold">
                    <Box mr={1}>
                      {saved ? <BsBookmarkFill /> : <BsBookmark />}
                    </Box>
                    {saved ? "Unsave post" : "Save post"}
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Center>
        </Flex>
      </Box>

      <Box mt={2}>
        <Text fontSize="lg" color="black.900" fontWeight="semibold">
          {post?.postData?.text}
        </Text>

        {post?.postData?.attachments?.length !== 0 &&
          post?.postData?.attachments?.map((attachment) => {
            return (
              <Asyncoload
                loading="lazy"
                key={attachment?.filename}
                src={attachment.url}
              />
            );
          })}
      </Box>

      <Box mb={1} mt={2}>
        {post?.postData?.hearts?.length !== 0 && (
          <Text fontSize="sm" color="gray.500">
            {post?.postData?.hearts?.length !== 0 &&
            post?.postData?.hearts?.length <= 1
              ? `${post?.postData?.hearts?.length} reaction`
              : `${post?.postData?.hearts?.length} reactions`}
          </Text>
        )}
      </Box>

      {/* Like, comment, etc... */}
      <Box mb={1}>
        <Flex>
          <Button
            isLoading={loading}
            size="sm"
            leftIcon={hearted ? <AiFillHeart /> : <AiOutlineHeart />}
            colorScheme={hearted ? "red" : null}
            w="full"
            me={1}
            onClick={
              hearted
                ? () => {
                    PostActions.unheartPost();
                  }
                : () => {
                    PostActions.heartPost();
                  }
            }
            _focus={false}
          >
            {/* TODO: Implement hearted/unhearted states for both the text and the icon */}
            {hearted ? "Unheart" : "Heart"}
          </Button>
          <Button
            size="sm"
            leftIcon={<BiChat />}
            w="full"
            _focus={false}
            ms={1}
            onClick={commentModalOnOpen}
          >
            Comment
          </Button>
          <Button
            size="sm"
            leftIcon={<BiShare />}
            w="full"
            _focus={false}
            ms={1}
            onClick={() => PostActions.sharePost()}
          >
            Share
          </Button>
        </Flex>
      </Box>
      <Divider />
      <Box mt={2}>
        <Text fontWeight="semibold" color="gray.400">
          {formatDistanceToNow(new Date(post?.postData?.datefield), {
            addSuffix: true,
            includeSeconds: false,
          })}
        </Text>
      </Box>

      <AlertDialog
        isOpen={deletePostAlertIsOpen}
        onClose={deletePostAlertOnClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button _focus={false} onClick={deletePostAlertOnClose}>
                Cancel
              </Button>
              <Button
                _focus={false}
                colorScheme="red"
                onClick={() => PostActions.deletePost()}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal
        onClose={commentModalOnClose}
        isOpen={commentModalIsOpen}
        scrollBehavior="inside"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comments</ModalHeader>
          <ModalCloseButton _focus={false} />
          <ModalBody>
            <CommentList comments={post?.postData?.comments} />
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Center>
              <form
                autoComplete="off"
                onSubmit={(event) => createComment(event)}
              >
                <Flex>
                  <Box me={1}>
                    <Input
                      placeholder="Comment something..."
                      name="comment"
                      type="text"
                      w="full"
                    />
                  </Box>

                  <Box ms={1}>
                    <Button
                      w="full"
                      colorScheme="blue"
                      _focus={false}
                      type="submit"
                    >
                      Comment
                    </Button>
                  </Box>
                </Flex>
              </form>
            </Center>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Post;
