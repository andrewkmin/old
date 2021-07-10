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
import Create from "../components/Create";
import { MdDelete } from "react-icons/md";
import PostList from "../components/PostList";
import DataContext from "../data/data.context";
import Stats from "../components/Profile/Stats";
import EditBio from "../components/Profile/EditBio";
// import Actions from "../components/Profile/Actions";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { HiOutlinePencil, HiPencil } from "react-icons/hi";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { useFetchAccount, useFetchAccountStatus } from "../api/hooks";

// The profile page
const Profile = () => {
  const history = useHistory();
  const { userData } = useContext(DataContext);
  const [posts, setPosts] = useState<Post[]>([]);
  const { username } = useParams<{ username?: string }>();
  const { data: userDataResponse, isFetching: userDataResponseIsFetching } = useFetchAccount(username, [username]);
  const { data: userStatusResponse, isFetching: userStatusResponseIsFetching } = useFetchAccountStatus(username, [username]);
  const { hasCopied, onCopy } = useClipboard(userDataResponse?.data?.username!!);

  useEffect(() => {
    // Checking if the user exists
    const exists = userDataResponse?.status !== 404;
    // If it doesn't exist then redirect back to the homepage
    if (!exists) history.push("/");
    return () => {};
  });

  // Displaying a spinner while data is fetching
  return userDataResponseIsFetching || userStatusResponseIsFetching ? (
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
                    <LazyLoadComponent>
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
                        h={["170px", "190px"]}
                        w={["xs", "md", "2xl", "full"]}
                        transition={"filter 0.3s ease-out"}
                        src={"https://picsum.photos/1920/500"}
                      />
                    </LazyLoadComponent>
                  </Center>
                </Box>
              </Center>

              <Flex w={"full"} alignItems={"center"} justifyContent={"right"}>
                <Menu isLazy>
                  <MenuButton
                    mt={-14}
                    rounded={"xl"}
                    as={IconButton}
                    me={[10, 14, 2]}
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
                  src={userDataResponse?.data?.avatar}
                  name={userDataResponse?.data?.first_name}
                >
                  {userData && (
                    <AvatarBadge
                      boxSize={"1em"}
                      bg={
                        userStatusResponse?.connected ? "green.500" : "gray.300"
                      }
                    />
                  )}
                </Avatar>
              </Center>

              <Box>
                <Stack spacing={1}>
                  <Center>
                    <Heading fontWeight={"bold"} fontSize={"2xl"}>
                      {userDataResponse?.data.first_name}{" "}
                      {userDataResponse?.data.last_name}
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
                              color={hasCopied ? "green.300" : "gray.400"}
                            >
                              {hasCopied
                                ? "Copied"
                                : `@${userDataResponse?.data?.username}`}
                            </Text>
                          </Tooltip>
                        </Center>

                        <Center>
                          {userDataResponse?.data?.id === userData?.id && (
                            <Badge
                              p={1.5}
                              rounded={"full"}
                              fontWeight={"bold"}
                              color={"green.400"}
                              userSelect={"none"}
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
                            <EditBio data={userDataResponse?.data} />
                          ) : (
                            <Text>
                              {userDataResponse?.data?.bio?.length === 0
                                ? `Hmm 🤔, it seems like this account doesn't have a bio...`
                                : userDataResponse?.data?.bio}
                            </Text>
                          )}
                        </Center>
                      </Box>

                      <Center>
                        {
                          username !== userData?.username && null
                          // <Actions
                          //   user={userDataResponse?.data}
                          //   friendshipData={friendshipData}
                          // />
                        }
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
                          : userDataResponse?.data?.first_name
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
