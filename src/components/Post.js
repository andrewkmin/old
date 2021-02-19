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
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { BiChat, BiShare } from "react-icons/bi";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import React, { useEffect, useState, useContext } from "react";

import CommentList from "./CommentList";
import DataContext from "../data/data.context";
import verification from "../auth/verification.js";

const Post = ({ data: post }) => {
  const Toast = useToast();
  const setData = useRef(() => {});
  const { userData } = useContext(DataContext);
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

  // Post states
  const [states, updateState] = useState({
    saved: false,
    hearted: false,
    hearting: false,
  });

  const CreateComment = async (event) => {
    event.preventDefault();
    const payload = {
      comment: event.target.elements.comment,
    };
  };

  const UnheartPost = () => {};
  const DeletePost = () => {};
  const UnsavePost = () => {};
  const HeartPost = () => {};
  const SavePost = () => {};

  // Setting the states
  setData.current = () => {
    if (post?.postData?.hearts?.includes(userData?._id)) {
      updateState({ hearted: true });
    }

    if (post?.authorData?.saved?.includes(userData?._id)) {
      updateState({ saved: true });
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
              <IconButton as={MenuButton} isRound>
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
                  <MenuItem
                    onClick={() => {
                      states.saved ? UnsavePost() : SavePost();
                    }}
                    fontWeight={"semibold"}
                  >
                    <Box mr={1}>
                      {states.saved ? <BsBookmarkFill /> : <BsBookmark />}
                    </Box>
                    {states.saved ? "Unsave post" : "Save post"}
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
            me={1}
            w={"full"}
            size={"sm"}
            isLoading={states.hearting}
            loadingText={states.hearted ? "Unhearting" : "Hearting"}
            leftIcon={states.hearted ? <AiFillHeart /> : <AiOutlineHeart />}
            colorScheme={states.hearted ? "red" : null}
            onClick={states.hearted ? () => UnheartPost() : () => HeartPost()}
          >
            {states.hearted ? "Unheart" : "Heart"}
          </Button>
          <Button
            size="sm"
            leftIcon={<BiChat />}
            w="full"
            ms={1}
            onClick={commentModalOnOpen}
          >
            Comment
          </Button>
          <Button
            size="sm"
            leftIcon={<BiShare />}
            w="full"
            ms={1}
            // onClick={() => { ... }}
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
              <Button onClick={deletePostAlertOnClose}>Cancel</Button>
              <Button colorScheme="red" onClick={() => DeletePost()} ml={3}>
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
          <ModalCloseButton />
          <ModalBody>
            <CommentList comments={post?.postData?.comments} />
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Center>
              <form
                autoComplete="off"
                onSubmit={(event) => CreateComment(event)}
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
                    <Button w="full" colorScheme="blue" type="submit">
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
