import {
  Avatar,
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
  Container,
} from "@chakra-ui/react";
import {
  FetchUser,
  FetchRelation,
  FetchUserPosts,
  FetchUserStatus,
  FetchFollowers,
  FetchFollowing,
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

  // Getting user's data with their username
  const { data: user = null, isLoading: userLoading } = useQuery(
    ["user", username],
    () => FetchUser(username!!)
  );
  // Whether other queries should trigger
  const hooksEnabled = user?.data?.id !== null && user?.data?.id !== undefined;

  // Getting their status
  const { data: status, isLoading: statusLoading } = useQuery(
    ["status", username],
    () => FetchUserStatus(username!!)
  );
  // Fetching their posts
  const { data: staticPosts, isLoading: postsLoading } = useQuery(
    ["posts", username],
    () => FetchUserPosts(username!!)
  );
  // Fetching relations between current account and other account
  const { data: relationStatus, isLoading: relationLoading } = useQuery(
    ["user relations", username],
    () => FetchRelation(user?.data?.id!!),
    { enabled: hooksEnabled }
  );
  // Getting user's followers
  const { data: followers, isLoading: followersLoading } = useQuery(
    ["user followers", username],
    () => FetchFollowers(user?.data?.id!!),
    { enabled: hooksEnabled }
  );
  // Getting the users that this user follows
  const { data: following, isLoading: followingLoading } = useQuery(
    ["user following", username],
    () => FetchFollowing(user?.data?.id!!),
    { enabled: hooksEnabled }
  );

  // To copy user's username to clipboard
  const { hasCopied, onCopy } = useClipboard(user?.data?.username!!);

  // Loading state
  const loading =
    userLoading ||
    statusLoading ||
    postsLoading ||
    relationLoading ||
    followersLoading ||
    followingLoading;

  // Checking if the user exists
  useEffect(() => {
    const exists = user?.status !== 404;
    // If it doesn't exist then redirect back to the homepage
    if (!exists) history.push("/");
  });

  // Setting dynamic post state
  useEffect(() => {
    setPosts(staticPosts!!);
    return () => setPosts([]);
  }, [staticPosts]);

  // Displaying a spinner while data is fetching
  return loading ? (
    <Center minH={"75vh"}>
      <Spinner size={"lg"} />
    </Center>
  ) : (
    // After everything is done fetching, showing user info
    <Box>
      <Box pb={10} pt={10}>
        <Center>
          <Box px={10}>
            <Box>
              <Center>
                <Box px={4} w={["sm", "lg", "full"]}>
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
                      w={["full", "md", "2xl"]}
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
                  <Menu>
                    <MenuButton
                      rounded={"xl"}
                      mt={[-12, -14]}
                      as={IconButton}
                      me={["8", "12", "8"]}
                      icon={<HiOutlinePencil />}
                      aria-label={"Change cover image"}
                    />

                    <MenuList mt={5} zIndex={1000}>
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
                  zIndex={10}
                  border={"4px"}
                  boxShadow={"lg"}
                  userSelect={"none"}
                  src={user?.data?.avatar}
                  name={user?.data?.username}
                  borderColor={status?.connected ? "green.500" : "gray.600"}
                />
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

                        {user?.data?.id === userData?.id && (
                          <Center>
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
                          </Center>
                        )}
                      </Stack>
                    </Box>

                    <Stack spacing={4}>
                      <Container>
                        <Center
                          color={"gray.500"}
                          textAlign={"center"}
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
                      </Container>

                      <Center>
                        <Stack spacing={4} direction={["column", "row"]}>
                          <Stats
                            state={{
                              followers,
                              following,
                              user: user?.data!!,
                            }}
                          />

                          {username !== userData?.username && (
                            <Actions
                              state={{
                                user: user?.data!!,
                                status: relationStatus,
                              }}
                            />
                          )}
                        </Stack>
                      </Center>
                    </Stack>
                  </Box>
                </Stack>
              </Box>

              <Center pt={5}>
                <Container>
                  <Center w={"full"}>
                    <Stack w={"full"} spacing={5}>
                      {username === userData?.username && (
                        <Create
                          state={{
                            posts,
                            setPosts,
                          }}
                        />
                      )}

                      {/* <PostList
                        state={{
                          data: posts,
                          noPostsText: `${
                            username === userData?.username
                              ? "You"
                              : user?.data?.first_name
                          }
                          ${
                            username === userData?.username
                              ? "don't"
                              : "doesn't"
                          }
                          have any posts yet`,
                        }}
                      /> */}
                    </Stack>
                  </Center>
                </Container>
              </Center>
            </Stack>
          </Box>
        </Center>
      </Box>
    </Box>
  );
};

export default Profile;
