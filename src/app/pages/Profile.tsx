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
  Tooltip,
} from "@chakra-ui/react";
import {
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
import EditBio from "../components/Profile/EditBio";
import { useHistory, useParams } from "react-router-dom";
import { HiOutlinePencil, HiPencil } from "react-icons/hi";
import { LazyLoadImage } from "react-lazy-load-image-component";

// The profile page
const Profile = () => {
  const history = useHistory();
  const { userData } = useContext(DataContext);
  const { accountId } = useParams<{ accountId?: string }>();
  const { data: posts, isFetching: postsAreFetching } =
    useFetchPosts(accountId);
  const { data: userDataResponse, isFetching: userDataResponseIsFetching } =
    useFetchAccount(accountId);
  const { data: userStatusResponse, isFetching: userStatusResponseIsFetching } =
    useFetchAccountStatus(accountId);

  useEffect(() => {
    // Checking if the user exists
    const exists = userDataResponse?.status !== 404;
    // If it doesn't exist then redirect back to the homepage
    if (!exists) history.push("/");
    return () => {};
  });

  return userDataResponseIsFetching ||
    userStatusResponseIsFetching ||
    postsAreFetching ? (
    <Center minH={"75vh"}>
      <Spinner size={"lg"} />
    </Center>
  ) : (
    <Box>
      <Box>
        <Center>
          <Box pb={10} px={10}>
            <Box>
              <Center>
                <Box w={["sm", "lg", "full"]}>
                  <Center>
                    <Image
                      w={["xs", "md", "lg", "full"]}
                      h={"170px"}
                      rounded={"xl"}
                      effect={"blur"}
                      boxShadow={"lg"}
                      bgColor={"white"}
                      objectFit={"cover"}
                      as={LazyLoadImage}
                      _hover={{
                        boxShadow: "xl",
                        filter: "brightness(0.9)",
                        transition: "0.2s ease-in",
                      }}
                      transition={"filter 0.3s ease-out"}
                      src={"https://picsum.photos/1920/500"}
                      // filter={blur ? "blur(20px)" : "none"}
                      // transition={blur ? "none" : "filter 0.3 ease-out"}
                    />
                  </Center>
                </Box>
              </Center>

              <Flex w={"full"} alignItems={"center"} justifyContent={"right"}>
                <Menu isLazy>
                  <MenuButton
                    mt={-14}
                    rounded={"xl"}
                    as={IconButton}
                    me={[10, null, 2]}
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
                    {/* {isFetching && <Spinner />} */}
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
                          <Tooltip label={"Yup, this is your account 😄"}>
                            <Badge
                              p={[1, 1.2, 1.5]}
                              rounded={"full"}
                              fontWeight={"bold"}
                              color={"green.400"}
                              userSelect={"none"}
                              fontFamily={"ubuntu bold"}
                            >
                              Your account
                            </Badge>
                          </Tooltip>
                        )}
                      </Center>
                    </Box>

                    <Stack spacing={3}>
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
                        <Stats />
                      </Center>
                    </Stack>
                  </Box>
                </Stack>
              </Box>

              <Box>
                <Stack spacing={2}>
                  {accountId === userData?.id && (
                    <Box>
                      <Create />
                    </Box>
                  )}

                  <PostList
                    noPostsText={`${
                      accountId === userData?.id
                        ? "You"
                        : userDataResponse?.data?.firstName
                    }{" "}
                          ${
                            accountId === userData?.id ? "don't" : "doesn't"
                          }{" "}
                          have any posts yet`}
                    data={posts}
                  />
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Center>
      </Box>
    </Box>
  );
};

export default Profile;
