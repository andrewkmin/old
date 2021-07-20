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
} from "@chakra-ui/react";
import { useContext } from "react";
// import axios from "../../../api/axios";
import { Link } from "react-router-dom";
import { MdPublic } from "react-icons/md";
import { BsFillUnlockFill } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import { PostProps } from "../../../types/index.d";
import DataContext from "../../../data/data.context";
import { formatDistanceToNow, formatISO } from "date-fns";

const Top = ({ data }: PostProps) => {
  const { userData } = useContext(DataContext);

  // TODO: Implement
  const savePost = async () => {};
  // TODO: Implement
  const reportPost = async () => {};
  // TODO: Implement
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                        label={formatISO(data?.created_at!!)}
                      >
                        <Text fontSize={"xs"}>
                          {formatDistanceToNow(data?.created_at!!, {
                            addSuffix: true,
                            includeSeconds: true,
                          })}
                        </Text>
                      </Tooltip>

                      <Tooltip
                        placement={"right"}
                        label={
                          data?.privacy!! === "PUBLIC" ? "Public" : "Private"
                        }
                      >
                        <Box>
                          {data?.privacy!! === "PUBLIC" ? (
                            <MdPublic />
                          ) : (
                            <BsFillUnlockFill />
                          )}
                        </Box>
                      </Tooltip>
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
              <MenuItem onClick={() => savePost()}>
                <Text fontFamily={"ubuntu bold"} fontWeight={"thin"}>
                  Save post
                </Text>
              </MenuItem>

              {/* For reporting a post */}
              <MenuItem onClick={() => reportPost()}>
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
