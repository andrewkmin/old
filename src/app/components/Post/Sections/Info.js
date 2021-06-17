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
  Stack,
  // useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { FiMoreHorizontal } from "react-icons/fi";

// import axios from "../../../api/axios";
import DataContext from "../../../data/data.context";

const Top = ({ states, setState, post, removeHandler }) => {
  // const Toast = useToast();
  const { userData } = useContext(DataContext);

  // TODO: Implement
  const savePost = async () => {};
  // TODO: Implement
  const unsavePost = async () => {};
  // TODO։ Implement
  const deletePost = async () => {};

  return (
    // Top section
    <Box>
      <Flex>
        {/* Author data container */}
        <Box>
          <Center>
            <Stack spacing={1.5} direction={"row"}>
              {/* Author Image */}
              <Link to={`/users/${post?.author?._id}`}>
                <Avatar src={post?.author?.avatar} />
              </Link>

              {/* Author name */}
              <Center>
                <Flex ms={1} direction={"column"}>
                  {/* Link to user's profile */}
                  <Link to={`/users/${post?.author?._id}`}>
                    <Text fontSize={["sm", "md"]} fontWeight={"bold"}>
                      {`${post?.author?.firstName} ${post?.author?.lastName}`}
                    </Text>
                  </Link>

                  {/* How much time has passed since the post was published */}
                  <Text fontSize={"xs"}>
                    {formatDistanceToNow(new Date(post?.createdAt), {
                      addSuffix: true,
                      includeSeconds: true,
                    })}
                  </Text>
                </Flex>
              </Center>
            </Stack>
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
              {post?.author?._id === userData?._id && (
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
              {/* <MenuItem
                onClick={states.saved ? () => unsavePost() : () => savePost()}
                fontWeight={"semibold"}
              > */}
              {/* <Box mr={1}>
                  {states.saved ? <BsBookmarkFill /> : <BsBookmark />}
                </Box> */}
              {/* {states.saved ? "Unsave post" : "Save post"}
              </MenuItem> */}
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default Top;
