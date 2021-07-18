import {
  Avatar,
  AvatarBadge,
  Badge,
  Box,
  Center,
  Flex,
  Heading,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Stack,
  Text,
  useClipboard,
  Tooltip,
} from "@chakra-ui/react";
import {
  FetchUser,
  FetchRelation,
  FetchUserPosts,
  FetchUserStatus,
} from "../api/functions";
import { Post } from "../types";
import { useQuery } from "react-query";
import Create from "../components/Create";
import { MdDelete } from "react-icons/md";
import PostList from "../components/PostList";
import DataContext from "../data/data.context";
import Stats from "../components/Profile/Stats";
import EditBio from "../components/Profile/EditBio";
import Actions from "../components/Profile/Actions";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { HiOutlinePencil, HiPencil } from "react-icons/hi";

// Profile page
const Profile = () => {
  const history = useHistory();
  const { userData } = useContext(DataContext);
  const [posts, setPosts] = useState<Post[]>([]);
  const { username } = useParams<{ username: string }>();

  // User data
  const { data: user = null, isLoading: userLoading } = useQuery(
    ["user", username],
    () => FetchUser(username!!)
  );
  const { data: status, isLoading: statusLoading } = useQuery(
    ["status", username],
    () => FetchUserStatus(username!!)
  );
  const { data: staticPosts, isLoading: postsLoading } = useQuery(
    ["posts", username],
    () => FetchUserPosts(username!!)
  );
  const { data: relationStatus, isLoading: relationLoading } = useQuery(
    ["user relations", user],
    () => FetchRelation(user?.data?.id!!),
    { enabled: user !== null }
  );
  const { hasCopied, onCopy } = useClipboard(user?.data?.username!!);

  useEffect(() => {
    // Checking if the user exists
    const exists = user?.status !== 404;
    // If it doesn't exist then redirect back to the homepage
    if (!exists) history.push("/");
    return () => {};
  });

  // Setting dynamic post state
  useEffect(() => {
    setPosts(staticPosts!!);
    return () => setPosts([]);
  }, [staticPosts]);

  // Displaying a spinner while data is fetching
  return userLoading || statusLoading || postsLoading || relationLoading ? (
    <Center minH={"75vh"}>
      <Spinner size={"lg"} />
    </Center>
  ) : (
    // After everything is done fetching, showing user info
    <Box>
      <Box>
        <Center>
          <Box px={10}>
            <Box>
              <Center>
                <Box w={["sm", "lg", "full"]}>
                  <Center>
                    <Image
                      rounded={"xl"}
                      boxShadow={"lg"}
                      bgColor={"white"}
                      objectFit={"cover"}
                      _hover={{
                        boxShadow: "xl",
                        filter: "brightness(0.9)",
                        transition: "0.2s ease-in",
                      }}
                      w={["xs", "md", "2xl"]}
                      h={["150px", "170px", "190px"]}
                      src={"/assets/placeholder.webp"}
                      transition={"filter 0.3s ease-out"}
                    />
                  </Center>
                </Box>
              </Center>

              {user?.data?.id === userData?.id && (
                <Flex
                  w={"full"}
                  alignItems={"center"}
                  justifyContent={"flex-end"}
                >
                  <Menu isLazy>
                    <MenuButton
                      rounded={"xl"}
                      mt={[-12, -14]}
                      as={IconButton}
                      me={["14", "12", "2"]}
                      icon={<HiOutlinePencil />}
                      aria-label={"Change cover image"}
                    />
                    <MenuList>
                      <MenuItem icon={<HiPencil fontSize={"20px"} />}>
                        Change cover
                      </MenuItem>
                      <MenuItem icon={<MdDelete fontSize={"20px"} />}>
                        Remove cover
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              )}
            </Box>

            <Stack>
              <Center>
                <Avatar
                  mt={-12}
                  size={"xl"}
                  boxShadow={"lg"}
                  src={user?.data?.avatar}
                  name={user?.data?.username}
                >
                  {userData && (
                    <AvatarBadge
                      boxSize={"1em"}
                      bg={status?.connected ? "green.500" : "gray.300"}
                    />
                  )}
                </Avatar>
              </Center>

              <Box>
                <Stack spacing={1}>
                  <Center>
                    <Heading fontWeight={"bold"} fontSize={"2xl"}>
                      {user?.data.first_name} {user?.data.last_name}
                    </Heading>
                  </Center>

                  <Box>
                    <Box>
                      <Stack>
                        <Center>
                          <Tooltip placement={"left"} label={"Copy username"}>
                            <Text
                              fontSize={"sm"}
                              onClick={onCopy}
                              cursor={"pointer"}
                              fontFamily={"ubuntu bold"}
                              color={hasCopied ? "purple.500" : "gray.400"}
                            >
                              {hasCopied
                                ? "Copied"
                                : `@${user?.data?.username}`}
                            </Text>
                          </Tooltip>
                        </Center>

                        <Center>
                          {user?.data?.id === userData?.id && (
                            <Badge
                              p={2}
                              rounded={"full"}
                              fontWeight={"bold"}
                              userSelect={"none"}
                              color={"purple.400"}
                              fontFamily={"ubuntu bold"}
                            >
                              Your account
                            </Badge>
                          )}
                        </Center>
                      </Stack>
                    </Box>

                    <Stack spacing={4}>
                      <Box>
                        <Center
                          fontSize={"lg"}
                          color={"gray.500"}
                          fontFamily={"Ubuntu Bold"}
                        >
                          {username === userData?.username ? (
                            <EditBio data={user?.data} />
                          ) : (
                            <Text>
                              {user?.data?.bio?.length === 0
                                ? `Hmm 🤔, it seems like this account doesn't have a bio...`
                                : user?.data?.bio}
                            </Text>
                          )}
                        </Center>
                      </Box>

                      <Center>
                        <Stack direction={["column", "row"]}>
                          <Stats />
                          {username !== userData?.username && (
                            <Box>
                              <Actions
                                user={user?.data!!}
                                status={relationStatus!!}
                              />
                            </Box>
                          )}
                        </Stack>
                      </Center>
                    </Stack>
                  </Box>
                </Stack>
              </Box>

              <Box pt={5}>
                <Center>
                  <Stack spacing={2}>
                    {username === userData?.username && (
                      <Box>
                        <Create setPosts={setPosts} posts={posts} />
                      </Box>
                    )}

                    <PostList
                      data={posts}
                      noPostsText={`${
                        username === userData?.username
                          ? "You"
                          : user?.data?.first_name
                      }
                          ${
                            username === userData?.username
                              ? "don't"
                              : "doesn't"
                          }
                          have any posts yet`}
                    />
                  </Stack>
                </Center>
              </Box>
            </Stack>
          </Box>
        </Center>
      </Box>
    </Box>
  );
};

export default Profile;
