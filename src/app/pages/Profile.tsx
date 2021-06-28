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
} from "@chakra-ui/react";
import {
  useCheckFriendship,
  useFetchAccount,
  useFetchAccountStatus,
  useFetchPosts,
} from "../api/hooks";
import Create from "../components/Create";
import { MdDelete } from "react-icons/md";
import PostList from "../components/PostList";
import { useContext, useEffect } from "react";
import DataContext from "../data/data.context";
import Stats from "../components/Profile/Stats";
import Actions from "../components/Profile/Actions";
import EditBio from "../components/Profile/EditBio";
import { useHistory, useParams } from "react-router-dom";
import { HiOutlinePencil, HiPencil } from "react-icons/hi";
import { LazyLoadComponent } from "react-lazy-load-image-component";

// The profile page
const Profile = () => {
  const history = useHistory();
  const { userData } = useContext(DataContext);
  const { accountId } = useParams<{ accountId?: string }>();

  const { data: posts, isFetching: postsAreFetching } = useFetchPosts(
    accountId,
    [accountId]
  );
  const { data: friendshipData, isFetching: friendshipDataIsFetching } =
    useCheckFriendship(accountId, [accountId]);
  const { data: userDataResponse, isFetching: userDataResponseIsFetching } =
    useFetchAccount(accountId, [accountId]);
  const { data: userStatusResponse, isFetching: userStatusResponseIsFetching } =
    useFetchAccountStatus(accountId, [accountId]);

  useEffect(() => {
    // Checking if the user exists
    const exists = userDataResponse?.status !== 404;
    // If it doesn't exist then redirect back to the homepage
    if (!exists) history.push("/");
    return () => {};
  });

  // Displaying a spinner while data is fetching
  return friendshipDataIsFetching ||
    userDataResponseIsFetching ||
    userStatusResponseIsFetching ||
    postsAreFetching ? (
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
                        // filter={blur ? "blur(20px)" : "none"}
                        // transition={blur ? "none" : "filter 0.3 ease-out"}
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
                  name={userDataResponse?.data?.firstName}
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
                      {userDataResponse?.data.firstName}{" "}
                      {userDataResponse?.data.lastName}
                    </Heading>
                  </Center>

                  <Box>
                    <Box>
                      <Center>
                        {userDataResponse?.data?.id !== userData?.id ? (
                          <Text
                            fontSize={"sm"}
                            color={"gray.400"}
                            fontFamily={"ubuntu bold"}
                          >
                            {userDataResponse?.data.id}
                          </Text>
                        ) : (
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
                    </Box>

                    <Stack spacing={4}>
                      <Box>
                        <Center
                          fontSize={"lg"}
                          color={"gray.500"}
                          fontFamily={"Ubuntu Bold"}
                        >
                          {accountId === userData?.id ? (
                            <EditBio data={userDataResponse?.data} />
                          ) : (
                            <Text>
                              {userDataResponse?.data.bio.length === 0
                                ? `Hmm 🤔, it seems like this account doesn't have a bio...`
                                : userDataResponse?.data.bio}
                            </Text>
                          )}
                        </Center>
                      </Box>

                      <Center>
                        {accountId !== userData?.id && (
                          <Actions
                            user={userDataResponse?.data}
                            friendshipData={friendshipData}
                          />
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
                    {accountId === userData?.id && (
                      <Box>
                        <Create posts={posts} />
                      </Box>
                    )}

                    <PostList
                      noPostsText={`${
                        accountId === userData?.id
                          ? "You"
                          : userDataResponse?.data?.firstName
                      }
                          ${accountId === userData?.id ? "don't" : "doesn't"}
                          have any posts yet`}
                      data={posts}
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
