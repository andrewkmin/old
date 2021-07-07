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
  chakra,
} from "@chakra-ui/react";
import { useContext } from "react";
import axios from "../../../api/axios";
import { Link } from "react-router-dom";
import { MdPublic } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
import { FiMoreHorizontal } from "react-icons/fi";
import { PostProps } from "../../../types/index.d";
import DataContext from "../../../data/data.context";
import { BsFillUnlockFill } from "react-icons/bs";

const Top = ({ data }: PostProps) => {
  const { userData } = useContext(DataContext);

  // TODO: Implement
  // const savePost = async () => {};
  // TODO: Implement
  // const unsavePost = async () => {};
  // TODO։ Implement
  const deletePost = async () => {
    const response = await axios.delete(`/posts/${data?.id}`);
  };

  return (
    // Top section
    <Box>
      <Flex>
        {/* Author data container */}
        <Box>
          <Center>
            <Stack spacing={1.5} direction={"row"}>
              {/* Author Image */}
              <Link to={`/users/${data?.user?.username}`}>
                <Avatar src={data?.user?.avatar} />
              </Link>

              {/* Author name */}
              <Center>
                <Flex ms={1} direction={"column"}>
                  {/* Link to user's profile */}
                  <Link to={`/users/${data?.user?.username}`}>
                    <Text fontSize={["sm", "md"]} fontWeight={"bold"}>
                      {`${data?.user?.first_name} ${data?.user?.last_name}`}
                    </Text>
                  </Link>

                  <Box>
                    <Stack direction={"row"} alignItems={"center"}>
                      {/* How much time has passed since the post was published */}
                      <Text fontSize={"xs"}>
                        {formatDistanceToNow(data?.created_at!!, {
                          addSuffix: true,
                          includeSeconds: true,
                        })}
                      </Text>

                      <Box>
                        {data?.privacy!! === "PUBLIC" ? (
                          <Tooltip label={"Public"}>
                            <MdPublic />
                          </Tooltip>
                        ) : (
                          <BsFillUnlockFill />
                        )}
                      </Box>
                    </Stack>
                  </Box>
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
            <IconButton aria-label={"More actions"} as={MenuButton} isRound>
              <Center>
                {/* The Icon of the menu */}
                <FiMoreHorizontal />
              </Center>
            </IconButton>

            <MenuList>
              {/* If post author's id is the same as the current user's id show delete post button */}
              {data?.user?.id === userData?.id && (
                // For deleting the post
                <MenuItem fontWeight="semibold" onClick={() => deletePost()}>
                  Delete Post
                </MenuItem>
              )}

              {/* Saving and unsaving the post */}
              {/* <MenuItem
                onClick={states.saved ? () => unsavePost() : () => savePost()}
                fontWeight={"semibold"}
              >
                <Box mr={1}>
                  {states.saved ? <BsBookmarkFill /> : <BsBookmark />}
                </Box>
                {states.saved ? "Unsave post" : "Save post"}
              </MenuItem> */}
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default Top;
