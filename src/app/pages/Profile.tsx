// TODO: Refactor and split the code
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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import {
  FetchUser,
  FetchRelation,
  FetchUserStatus,
  FetchFollowers,
  FetchFollowing,
} from "../api/functions";
import { Post } from "../types";
import { format } from "date-fns";
import { useQuery } from "react-query";
import Create from "../components/Create";
import { MdDelete } from "react-icons/md";
import PostList from "../components/PostList";
import DataContext from "../data/data.context";
import Stats from "../components/Profile/Stats";
// import EditBio from "../components/Profile/EditBio";
import Actions from "../components/Profile/Actions";
import ProfileContext from "../contexts/profile.context";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { HiOutlinePencil, HiPencil } from "react-icons/hi";
import { useFetchInfiniteResource } from "../utils/hooks";
import PostListContext from "../contexts/post.list.context";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

const PostsTab = ({
  postsHaveNextPage,
  nextCursor,
  setCursor,
  fetchingPosts,
}: any) => {
  return (
    <Stack spacing={5}>
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
              if (postsHaveNextPage && nextCursor) setCursor(nextCursor);
            }}
          >
            Load more
          </Button>
        </Center>
      )}

      {!postsHaveNextPage && (
        <Center mt={5}>
          <Text fontWeight={"semibold"} fontSize={["md", null, "lg"]}>
            Looks like you have reached the end 🎉
          </Text>
        </Center>
      )}
    </Stack>
  );
};

// Profile page
const Profile = () => {
  const history = useHistory();
  const [state, setState] = useState({});
  const { userData } = useContext(DataContext);
  const { username } = useParams<{ username: string }>();
  const [cursor, setCursor] = useState<string | null>(null);

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
    [`user-${username}-relations`, username],
    () => FetchRelation(user?.data?.id!!),
    { enabled: hooksEnabled }
  );

  // Getting user's followers
  const { data: followers, isLoading: followersLoading } = useQuery(
    [`user-${username}-followers`, username],
    () => FetchFollowers(user?.data?.id!!),
    { enabled: hooksEnabled }
  );

  // Getting the users that this user follows
  const { data: following, isLoading: followingLoading } = useQuery(
    [`user-${username}-following`, username],
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
  }, [history, user?.status]);

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
                        <Tooltip label={"Work in progress"}>
                          <MenuButton
                            rounded={"xl"}
                            mt={[-12, -14]}
                            as={IconButton}
                            isDisabled={true}
                            me={["8", "12", "8"]}
                            icon={<HiOutlinePencil />}
                            aria-label={"Change cover image"}
                          />
                        </Tooltip>

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
                  <Box mt={-4}>
                    <Stack spacing={3}>
                      <Avatar
                        mt={-12}
                        size={"xl"}
                        zIndex={10}
                        boxShadow={"lg"}
                        userSelect={"none"}
                        src={user?.data?.avatar}
                        name={user?.data?.username}
                        _hover={{
                          filter: "brightness(90%)",
                          boxShadow: "xl",
                        }}
                        transition={"150ms all"}
                      />

                      <Box>
                        <Stack spacing={1}>
                          <Stack direction={"row"} alignItems={"center"}>
                            <Heading fontWeight={"bold"} fontSize={"2xl"}>
                              {user?.data.first_name} {user?.data.last_name}
                            </Heading>

                            <Badge
                              border={"2px"}
                              rounded={"lg"}
                              fontSize={"md"}
                              boxShadow={"md"}
                              fontWeight={"thin"}
                              fontFamily={"ubuntu bold"}
                              colorScheme={
                                status?.connected ? "purple" : "gray"
                              }
                            >
                              {status?.connected ? "Online" : "Offline"}
                            </Badge>
                          </Stack>

                          <Stack alignItems={"center"} direction={"row"}>
                            <Text
                              color={"gray.500"}
                              fontWeight={"thin"}
                              fontFamily={"ubuntu bold"}
                            >
                              Member since{" "}
                              {format(user?.data?.created_at!!, "dd MMM yyyy")}
                            </Text>

                            <Text color={"gray.500"}>•</Text>

                            <Tooltip
                              placement={"right"}
                              label={"Copy username"}
                            >
                              <Text
                                fontSize={"sm"}
                                onClick={onCopy}
                                cursor={"pointer"}
                                fontFamily={"ubuntu bold"}
                                color={hasCopied ? "purple.500" : "gray.500"}
                              >
                                {hasCopied
                                  ? "Copied"
                                  : `@${user?.data?.username}`}
                              </Text>
                            </Tooltip>
                          </Stack>

                          <Box>
                            <Stack pb={5} spacing={2}>
                              <Box
                                color={"gray.500"}
                                fontFamily={"Ubuntu Bold"}
                              >
                                {username === userData?.username ? (
                                  // <EditBio data={user?.data} />
                                  <></>
                                ) : (
                                  <Text>
                                    {user?.data?.bio?.length === 0
                                      ? `Hmm 🤔, it seems like this account doesn't have a bio...`
                                      : user?.data?.bio}
                                  </Text>
                                )}
                              </Box>

                              <Stack
                                spacing={4}
                                alignItems={"center"}
                                direction={["column", "row"]}
                              >
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
                            </Stack>
                          </Box>
                        </Stack>
                      </Box>
                    </Stack>
                  </Box>

                  <Center>
                    <Container>
                      {username === userData?.username && <Create />}

                      <Tabs
                        pt={5}
                        colorScheme={"purple"}
                        variant={"soft-rounded"}
                      >
                        <TabList>
                          <Tab>Posts</Tab>
                          {username === userData?.username && (
                            <>
                              <Tab>Saved</Tab>
                              <Tab>Hearted</Tab>
                            </>
                          )}
                        </TabList>

                        <TabPanels>
                          <TabPanel>
                            <PostsTab
                              setCursor={setCursor}
                              nextCursor={nextCursor}
                              fetchingPosts={fetchingPosts}
                              postsHaveNextPage={postsHaveNextPage}
                            />
                          </TabPanel>

                          {username === userData?.username && (
                            <>
                              <TabPanel>Saved</TabPanel>
                              <TabPanel>Hearted</TabPanel>
                            </>
                          )}
                        </TabPanels>
                      </Tabs>
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
