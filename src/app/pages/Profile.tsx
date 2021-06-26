import { useContext, useEffect } from "react";
import {
  useFetchAccount,
  useFetchAccountStatus,
  useFetchPosts,
} from "../api/hooks";
import { useHistory, useParams } from "react-router-dom";
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
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Post from "../components/Post";
import Create from "../components/Create";
import DataContext from "../data/data.context";
import { HiOutlinePencil, HiPencil } from "react-icons/hi";
import EditBio from "../components/Profile/EditBio";
import { MdDelete } from "react-icons/md";

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

  return (
    <Box>
      <Box>
        <Center>
          <Box px={10}>
            <Box w={"full"}>
              <Box>
                <Image
                  rounded={"xl"}
                  boxShadow={"lg"}
                  bgColor={"white"}
                  objectFit={"cover"}
                  h={["125px", "170px"]}
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
              </Box>

              <Flex w={"full"} alignItems={"center"} justifyContent={"right"}>
                <Menu isLazy>
                  <MenuButton
                    me={3}
                    mt={"-14"}
                    rounded={"xl"}
                    as={IconButton}
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
                {/* <IconButton
                  me={3}
                  mt={"-14"}
                  rounded={"xl"}
                  icon={<HiOutlinePencil />}
                  aria-label={"Change cover image"}
                /> */}
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
                              p={1.5}
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
                  </Box>
                </Stack>
              </Box>

              <Box pt={3}>
                {accountId === userData?.id && (
                  <Box>
                    <Create />
                  </Box>
                )}

                <Box>
                  {posts?.map((post, index) => {
                    return <Post data={post} key={index} />;
                  })}
                </Box>
              </Box>
            </Stack>
          </Box>
        </Center>
      </Box>
    </Box>
  );
};

export default Profile;
