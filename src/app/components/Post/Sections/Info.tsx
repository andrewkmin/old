import {
  Avatar,
  Box,
  Center,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  Stack,
  Tooltip,
  useToast,
  chakra,
} from "@chakra-ui/react";
import { useContext } from "react";
import axios from "../../../api/axios";
import { Link } from "react-router-dom";
import { MdPublic } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";
import DataContext from "../../../data/data.context";
import { IoPeopleCircleSharp } from "react-icons/io5";
import { Post as PostType } from "../../../types/index";
import PostContext from "../../../contexts/post.context";
import { formatDistanceToNow, formatISO } from "date-fns";
import PostListContext from "../../../contexts/post.list.context";

const Top = () => {
  const { userData } = useContext(DataContext);
  const toast = useToast({ position: "bottom-left" });
  const { post: data, setPost: setPostData } = useContext(PostContext);
  const { data: allPosts, setData: setAllPosts } = useContext(PostListContext);

  // For deleting this post
  const deletePost = async () => {
    // Updating the state of current post
    setPostData({ ...data, isBeingDeleted: true });
    // Sending the request
    const { status } = await axios.delete(`/api/posts/${data.id}/delete`);

    // If successfully removed
    if (status === 204) {
      // Filtering the posts
      const newState = allPosts?.filter(
        (post: Partial<PostType>) => post.id !== data.id
      );

      // Updating the post array
      setAllPosts(newState);

      // Notifying the user
      return toast({
        title: "Post deleted!",
      });
    }
    // On error
    else {
      return toast({
        title: "There was an error",
        status: "error",
      });
    }
  };

  return (
    <Box>
      <Flex>
        <Box>
          <Center>
            <Stack spacing={1.5} direction={"row"}>
              {/* Author Image */}
              <Link to={`/@${data?.user?.username}`}>
                <Avatar name={data?.user?.username} src={data?.user?.avatar} />
              </Link>

              {/* Author name */}
              <Center>
                <Flex ms={1} direction={"column"}>
                  {/* Link to user's profile */}
                  <Link to={`/@${data?.user?.username}`}>
                    <Text fontSize={["sm", "md"]} fontWeight={"bold"}>
                      {`${data?.user?.first_name} ${data?.user?.last_name}`}
                    </Text>
                  </Link>

                  <Box>
                    <Stack direction={"row"} alignItems={"center"}>
                      {/* How much time has passed since the post was published */}
                      <Tooltip
                        placement={"bottom-start"}
                        label={formatISO(Date.parse(data?.created_at))}
                      >
                        <Text fontSize={"xs"}>
                          {data?.created_at &&
                            formatDistanceToNow(Date.parse(data?.created_at), {
                              addSuffix: true,
                              includeSeconds: true,
                            })}
                        </Text>
                      </Tooltip>

                      {/* <Tooltip
                        placement={"right"}
                        label={
                          data?.privacy === "PUBLIC" ? "Public" : "Private"
                        }
                      >
                        <chakra.span ms={-0.5} fontSize={"xl"}>
                          {data?.privacy === "PUBLIC" ? (
                            <MdPublic />
                          ) : (
                            <IoPeopleCircleSharp />
                          )}
                        </chakra.span>
                      </Tooltip> */}
                    </Stack>
                  </Box>
                </Flex>
              </Center>
            </Stack>
          </Center>
        </Box>

        <Spacer />

        <Box>
          {/* Action menu */}
          <Menu isLazy>
            <IconButton
              isRound
              size={"sm"}
              as={MenuButton}
              aria-label={"Actions"}
            >
              <Center>
                <FiMoreHorizontal />
              </Center>
            </IconButton>

            <MenuList>
              {/* If post author's id is the same as the current user's id show delete post button */}
              {data?.user?.id === userData?.id && (
                // For deleting the post
                <MenuItem fontWeight="semibold" onClick={() => deletePost()}>
                  <Text fontFamily={"ubuntu bold"} fontWeight={"thin"}>
                    Delete post
                  </Text>
                </MenuItem>
              )}

              {/* Saving and unsaving the post */}
              {/* TODO: Make the execution of the function dynamic */}
              <MenuItem>
                <Text fontFamily={"ubuntu bold"} fontWeight={"thin"}>
                  Save post
                </Text>
              </MenuItem>

              {/* For reporting a post */}
              <MenuItem>
                <Text fontFamily={"ubuntu bold"} fontWeight={"thin"}>
                  Report post
                </Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default Top;
