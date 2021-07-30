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
  Button,
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
import ProfileContext from "../contexts/profile.context";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { HiOutlinePencil, HiPencil } from "react-icons/hi";
import { useFetchInfiniteResource } from "../utils/hooks";
import PostListContext from "../contexts/post.list.context";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

// Profile page
const Profile = () => {
  const history = useHistory();
  const [state, setState] = useState({});
  const [cursor, setCursor] = useState(0);
  const { userData } = useContext(DataContext);
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
  // Fetching the posts of the user
  const {
    setData,
    data: posts,
    next: nextCursor,
    isLoading: postsLoading,
    hasNextPage: postsHaveNextPage,
    isFetchingNextPage: fetchingPosts,
  } = useFetchInfiniteResource<Partial<Post>>({
    config: {
      enabled: true,
    },
    cursor,
    nextPageParam: "next",
    queryParam: "cursor",
    url: `/api/posts/${username}`,
  });
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
    if (!exists) return history.push("/");
  });

  useBottomScrollListener(
    () => {
      if (postsHaveNextPage && nextCursor) setCursor(nextCursor);
    },
    {
      offset: 500,
    }
  );

  // Displaying a spinner while data is fetching
  return loading ? (
    <Center minH={"75vh"}>
      <Spinner size={"lg"} />
    </Center>
  ) : (
    // After everything is done fetching, showing user info
    <ProfileContext.Provider value={{ state, setState }}>
      <PostListContext.Provider value={{ data: posts, setData }}>
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
                          src={
                            !user?.data?.cover
                              ? "/assets/placeholder.webp"
                              : user?.data?.cover
                          }
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
                      boxShadow={"lg"}
                      userSelect={"none"}
                      src={user?.data?.avatar}
                      name={user?.data?.username}
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
                              <Tooltip
                                placement={"left"}
                                label={"Copy username"}
                              >
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
                          {username === userData?.username && <Create />}

                          <PostList />

                          {postsHaveNextPage && (
                            <Center>
                              <Button
                                size={"md"}
                                rounded={"xl"}
                                colorScheme={"purple"}
                                bgColor={"purple.400"}
                                isLoading={fetchingPosts}
                                isDisabled={fetchingPosts}
                                onClick={() => {
                                  if (postsHaveNextPage && nextCursor)
                                    setCursor(nextCursor);
                                }}
                              >
                                Load more
                              </Button>
                            </Center>
                          )}

                          {!postsHaveNextPage && (
                            <Center mt={5}>
                              <Text
                                fontWeight={"semibold"}
                                fontSize={["md", null, "lg"]}
                              >
                                Looks like you have reached the end 🎉
                              </Text>
                            </Center>
                          )}
                        </Stack>
                      </Center>
                    </Container>
                  </Center>
                </Stack>
              </Box>
            </Center>
          </Box>
        </Box>
      </PostListContext.Provider>
    </ProfileContext.Provider>
  );
};

export default Profile;
