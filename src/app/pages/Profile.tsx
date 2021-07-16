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
import { Post } from "../types";
import { useQuery } from "react-query";
import Create from "../components/Create";
import { MdDelete } from "react-icons/md";
import PostList from "../components/PostList";
import { FetchPosts } from "../api/functions";
import DataContext from "../data/data.context";
import Stats from "../components/Profile/Stats";
import EditBio from "../components/Profile/EditBio";
import Actions from "../components/Profile/Actions";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { HiOutlinePencil, HiPencil } from "react-icons/hi";
import { useFetchUser, useFetchUserStatus } from "../api/hooks";

// The profile page
const Profile = () => {
  const history = useHistory();
  const { userData } = useContext(DataContext);
  const [posts, setPosts] = useState<Post[]>([]);
  const { username } = useParams<{ username?: string }>();

  // Fetching
  const { data: user, isLoading: userIsLoading } = useFetchUser(username, [
    username,
  ]);
  const { data: status, isLoading: statusIsLoading } = useFetchUserStatus(
    username,
    [username]
  );
  const { data: staticPosts, isLoading: postsAreLoading } = useQuery(
    ["user posts", username],
    () => FetchPosts(),
    {
      keepPreviousData: true,
    }
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
  useEffect(() => setPosts(staticPosts!!), [staticPosts]);

  // Displaying a spinner while data is fetching
  return userIsLoading || statusIsLoading || postsAreLoading ? (
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
                      h={["150px", "170px", "190px"]}
                      w={["xs", "md", "2xl", "full"]}
                      transition={"filter 0.3s ease-out"}
                      src={"https://picsum.photos/1920/500"}
                    />
                  </Center>
                </Box>
              </Center>

              <Flex w={"full"} alignItems={"center"} justifyContent={"right"}>
                <Menu isLazy>
                  <MenuButton
                    mt={[-12, -14]}
                    rounded={"xl"}
                    as={IconButton}
                    me={[16, 12, 2]}
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
                        {username !== userData?.username && (
                          <Actions user={user?.data} friendshipData={0} />
                        )}
                      </Center>

                      <Center>
                        <Stats />
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
