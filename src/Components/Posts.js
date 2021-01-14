import {
  Box,
  Container,
  SkeletonCircle,
  SkeletonText,
  Flex,
  Center,
  Divider,
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
  Button,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { FiMoreHorizontal } from "react-icons/fi";

import trunk from "trunk-js";
import _axios from "../helpers/_axios";
import verification from "../auth/verify.token";
import PostRenderer from "../helpers/PostRenderer";

const PostSkeleton = () => {
  return (
    <Box borderTopRadius="xl" padding="6" boxShadow="lg" bg="white" m={2}>
      <Box>
        <Flex>
          <Center>
            <SkeletonCircle size="10" />
            <SkeletonText w="sm" ms={3} noOfLines={1} />
          </Center>
        </Flex>
      </Box>
      <SkeletonText mt="4" noOfLines={4} spacing="4" />
    </Box>
  );
};

const Posts = () => {
  const cancelRef = useRef();
  const { accountId } = useParams();
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const onClose = () => setIsOpen(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await _axios.get(
        `/api/posts/fetch/${accountId ? `?accountId=${accountId}` : ``}`
      );
      setPosts(data);
      setLoading(false);
      return data;
    };
    fetchPosts();
  }, [accountId]);

  return (
    <Box overflow="none" w="full" mt={5}>
      <Container>
        {loading ? (
          <Box>
            <PostSkeleton />
            <Divider />
            <PostSkeleton />
          </Box>
        ) : (
          <Box>
            {posts.length === 0 ? (
              <Center>
                <Text color="gray.600" fontSize="xl" fontWeight="bold">
                  No posts yet
                </Text>
              </Center>
            ) : (
              posts.map((post) => {
                return (
                  <Box
                    key={post._id}
                    mb={1}
                    padding="4"
                    boxShadow="lg"
                    bg="white"
                    borderRadius="md"
                  >
                    <Box>
                      <Flex>
                        <Box>
                          <Center>
                            <Avatar src={post.authorImage} />
                            <Link to={`/users/${post.authorId}`}>
                              <Text ms={2} color="blue.500">
                                {trunk(post.author, 15, "...")}
                              </Text>
                            </Link>
                          </Center>
                        </Box>

                        <Spacer />

                        <Center>
                          <Menu>
                            <IconButton
                              as={MenuButton}
                              isRound
                              _focus={false}
                              _focusVisible={false}
                              _focusWithin={false}
                            >
                              <Center>
                                <FiMoreHorizontal />
                              </Center>
                            </IconButton>
                            <MenuList>
                              <MenuGroup title="Actions">
                                {post.authorId === verification.id && (
                                  <MenuItem
                                    fontWeight="semibold"
                                    onClick={() => setIsOpen(true)}
                                  >
                                    <FaTrash color="red" />
                                    Delete Post
                                  </MenuItem>
                                )}
                              </MenuGroup>
                            </MenuList>
                          </Menu>
                        </Center>
                      </Flex>
                    </Box>
                    <Box mt={2} textAlign="left" alignContent="center">
                      <PostRenderer input={post.text} />
                    </Box>
                    <AlertDialog
                      isOpen={isOpen}
                      leastDestructiveRef={cancelRef}
                      onClose={onClose}
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
                            <Button ref={cancelRef} onClick={onClose}>
                              Cancel
                            </Button>
                            <Button colorScheme="red" onClick={onClose} ml={3}>
                              Delete
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>
                  </Box>
                );
              })
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Posts;
