import {
  Avatar,
  Box,
  Container,
  Flex,
  Text,
  AvatarBadge,
  Center,
  Button,
  Link,
  Stack,
  Spinner,
  Progress,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { RiMessage2Fill } from "react-icons/ri";
import { NavLink, useParams } from "react-router-dom";
import { AiOutlineMinusCircle, AiTwotoneEdit } from "react-icons/ai";
import { BsPersonPlusFill, BsFillGearFill, BsMoon } from "react-icons/bs";

import PostList from "../PostList";
import CreatePost from "../Create/index";
import { useFetchUserData } from "../../api/hooks";
import verification from "../../auth/verification.js";

const Profile = () => {
  const { accountId } = useParams();
  const [userData, setUserData] = useState({});
  const { data, isFetched } = useFetchUserData(accountId);
  const [userStatus, setUserStatus] = useState("offline");

  useEffect(() => {
    if (isFetched) {
      setUserData(data.userData);
      setUserStatus(data.status.message);
    }
  }, [data?.status, data?.userData, isFetched]);

  return (
    <>
      <Helmet>
        <title>
          {userData?.fullName ? userData?.fullName + " - Usocial" : "Usocial"}
        </title>
      </Helmet>
      <Box>
        <Container>
          <Flex>
            <Link target={"_blank"} href={userData?.pictureUrl}>
              <Avatar
                size={"xl"}
                name={userData?.fullName}
                src={userData?.pictureUrl}
              >
                <AvatarBadge
                  boxSize="1em"
                  bg={
                    userStatus === "active"
                      ? "green.500"
                      : userStatus === "dnd"
                      ? "red.500"
                      : userStatus === "idle"
                      ? "yellow.500"
                      : "gray.500"
                  }
                >
                  <Center>
                    {userStatus === "dnd" && (
                      <AiOutlineMinusCircle size="1rem" />
                    )}
                    {userStatus === "idle" && <BsMoon size="1rem" />}
                  </Center>
                </AvatarBadge>
              </Avatar>
            </Link>

            <Center>
              <Flex direction={"column"}>
                {!isFetched ? (
                  <Progress size={"xs"} isIndeterminate />
                ) : (
                  <Text ms={5} fontWeight="semibold" fontSize={["lg", "2xl"]}>
                    {userData?.fullName}
                  </Text>
                )}
                <Text
                  color={"gray.500"}
                  ms={5}
                  fontSize={["xs", "sm"]}
                  fontWeight={"semibold"}
                >
                  Account created at{" "}
                  {userData.datefield &&
                    format(userData.datefield, "LLLL dd y")}
                </Text>
              </Flex>
            </Center>
          </Flex>

          <Box mt={7}>
            <Stack direction={["column", "row"]}>
              {!isFetched ? (
                <Progress size={"xs"} isIndeterminate />
              ) : verification.id === userData._id ? (
                <>
                  <Button
                    w={"full"}
                    leftIcon={<AiTwotoneEdit />}
                    colorScheme={"gray"}
                  >
                    Edit Profile
                  </Button>

                  <Button
                    w={"full"}
                    as={NavLink}
                    to={"/settings"}
                    leftIcon={<BsFillGearFill />}
                    colorScheme={"gray"}
                  >
                    Settings
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    w={"full"}
                    leftIcon={<BsPersonPlusFill />}
                    colorScheme={"green"}
                  >
                    Add friend
                  </Button>
                  <Button
                    w={"full"}
                    leftIcon={<RiMessage2Fill />}
                    colorScheme={"blue"}
                  >
                    Message
                  </Button>
                </>
              )}
            </Stack>
          </Box>
        </Container>

        <Container mt={10}>
          {verification.id === userData._id && <CreatePost />}
          <PostList />
        </Container>
      </Box>
    </>
  );
};

export default Profile;
