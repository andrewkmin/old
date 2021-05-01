import { useContext } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiMoreHorizontal } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";

import axios from "../../../api/axios";
import DataContext from "../../../data/data.context";

const Top = ({ states, setState, post, removeHandler }) => {
  const Toast = useToast();
  const { userData } = useContext(DataContext);

  console.log(userData);

  const savePost = async () => {
    const { data } = await axios.put(
      `/api/posts/save/?postId=${post?.postData?._id}`
    );

    if (!data?.error) {
      setState({ saved: true });
    } else {
      return Toast({
        title: "There was an error",
        description: data.error,
        duration: 2000,
        isClosable: false,
        status: "error",
      });
    }
  };

  const unsavePost = async () => {
    const { data } = await axios.put(
      `/api/posts/unsave/?postId=${post?.postData?._id}`
    );

    if (!data?.error) {
      setState({ saved: false });
    } else {
      return Toast({
        title: "There was an error",
        description: data.error,
        duration: 2000,
        isClosable: false,
        status: "error",
      });
    }
  };

  const deletePost = async () => {
    setState({ deleting: true });
    const { data } = await axios.delete(
      `/api/posts/delete/?postId=${post?.postData?._id}`
    );

    if (!data?.error) {
      removeHandler(post?.postData?._id);
    } else {
      return Toast({
        title: "There was an error",
        description: data.error,
        duration: 2000,
        isClosable: false,
        status: "error",
      });
    }
  };

  return (
    // Top section
    <Box>
      <Flex>
        {/* Author data container */}
        <Box>
          <Center>
            <Flex>
              {/* Author Image */}
              <Link to={`/users/${post?.authorData?._id}`}>
                <Avatar src={post?.authorData?.avatar} />
              </Link>

              {/* Author name */}
              <Center>
                <Flex ms={1} direction={"column"}>
                  {/* Link to user's profile */}
                  <Link to={`/users/${post?.authorData?._id}`}>
                    <Text fontSize={["sm", "md"]} fontWeight={"bold"}>
                      {`${post?.authorData?.firstName} ${post?.authorData?.lastName}`}
                    </Text>
                  </Link>

                  {/* How much time has passed since the post was published */}
                  <Text fontSize={"xs"}>
                    {post?.postData?.datefield &&
                      formatDistanceToNow(new Date(post?.postData?.datefield), {
                        addSuffix: true,
                        includeSeconds: true,
                      })}
                  </Text>
                </Flex>
              </Center>
            </Flex>
          </Center>
        </Box>

        <Spacer />

        {/* Action menu */}
        <Box>
          {/* The menu */}
          <Menu>
            <IconButton as={MenuButton} isRound>
              <Center>
                {/* The Icon of the menu */}
                <FiMoreHorizontal />
              </Center>
            </IconButton>

            <MenuList>
              {/* If post author's id is the same as the current user's id show delete post button */}
              {post?.postData?.authorId === userData?._id && (
                // For deleting the post
                <MenuItem
                  // icon={<FaTimes color={"red"} />}
                  fontWeight="semibold"
                  onClick={() => deletePost()}
                >
                  Delete Post
                </MenuItem>
              )}

              {/* Saving and unsaving the post */}
              <MenuItem
                onClick={states.saved ? () => unsavePost() : () => savePost()}
                fontWeight={"semibold"}
              >
                {/* <Box mr={1}>
                  {states.saved ? <BsBookmarkFill /> : <BsBookmark />}
                </Box> */}
                {states.saved ? "Unsave post" : "Save post"}
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default Top;
