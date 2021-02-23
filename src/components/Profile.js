import {
  Avatar,
  Box,
  Container,
  Flex,
  Text,
  AvatarBadge,
  Center,
  Button,
  Badge,
  Link,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { RiMessage2Fill } from "react-icons/ri";
import { NavLink, useParams } from "react-router-dom";
import { AiOutlineMinusCircle, AiTwotoneEdit } from "react-icons/ai";
import { BsPersonPlusFill, BsFillGearFill, BsMoon } from "react-icons/bs";

import CreatePost from "./Create";
import PostList from "./PostList";
import { useFetchUserData } from "../api/hooks";
import verification from "../auth/verification.js";

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
                size="xl"
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
                <Text ms={5} fontWeight="semibold" fontSize="2xl">
                  {userData?.fullName}
                  {verification.id === userData?._id && (
                    <Badge ms={2} variant="outline" colorScheme="blue">
                      Your Account
                    </Badge>
                  )}
                </Text>
                <Text
                  color={"gray.500"}
                  ms={5}
                  fontSize={"sm"}
                  fontWeight={"semibold"}
                >
                  Account created at{" "}
                  {userData.datefield &&
                    format(userData.datefield, "LLLL dd y")}
                </Text>
              </Flex>
            </Center>
          </Flex>

          {verification?.id === userData?._id ? (
            <Center mt={5}>
              <Flex>
                <Box>
                  <Button leftIcon={<AiTwotoneEdit />} colorScheme="gray">
                    Edit Profile
                  </Button>
                </Box>

                <Box ms={2}>
                  <Button
                    as={NavLink}
                    to="/settings"
                    leftIcon={<BsFillGearFill />}
                    colorScheme="gray"
                  >
                    Settings
                  </Button>
                </Box>
              </Flex>
            </Center>
          ) : (
            <Center mt={5}>
              <Flex>
                <Box me={1}>
                  <Button leftIcon={<BsPersonPlusFill />} colorScheme="green">
                    Add friend
                  </Button>
                </Box>

                <Box ms={1}>
                  <Button leftIcon={<RiMessage2Fill />} colorScheme="blue">
                    Message
                  </Button>
                </Box>
              </Flex>
            </Center>
          )}
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
