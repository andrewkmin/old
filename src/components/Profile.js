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
} from "@chakra-ui/react";
import PostList from "./PostList";
import _axios from "../api/_axios";
import CreatePost from "./CreatePost";
import { RiMessage2Fill } from "react-icons/ri";
import verification from "../auth/verification.js";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { AiOutlineMinusCircle, AiTwotoneEdit } from "react-icons/ai";
import { BsPersonPlusFill, BsFillGearFill, BsMoon } from "react-icons/bs";

const UserProfile = () => {
  const { accountId } = useParams();
  const [userData, setUserData] = useState({});
  const [userStatus, setUserStatus] = useState("offline");

  useEffect(() => {
    // fetchAccount.current();
    const fetchAccount = async () => {
      // For getting user data
      const { data: _userData } = await _axios.get(
        `/api/accounts/fetch/?accountId=${accountId}`
      );
      // For checking if the user is online
      const { data: _userIsActive } = await _axios.get(
        `/api/network/status/?accountId=${accountId}`
      );
      await verification.verify();

      setUserData(_userData);
      setUserStatus(_userIsActive.message);
      return _userData;
    };

    fetchAccount();
  }, [accountId]);

  return (
    <Box>
      <Container>
        <Flex>
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
                {userStatus === "dnd" && <AiOutlineMinusCircle size="1rem" />}
                {userStatus === "idle" && <BsMoon size="1rem" />}
              </Center>
            </AvatarBadge>
          </Avatar>

          <Center>
            <Text ms={5} fontWeight="semibold" fontSize="2xl">
              {userData?.fullName}
              {verification.id === userData?._id && (
                <Badge ms={2} variant="outline" colorScheme="blue">
                  Your Account
                </Badge>
              )}
            </Text>
          </Center>
        </Flex>

        {verification?.id === userData?._id ? (
          <Center mt={5}>
            <Flex>
              <Box>
                <Button
                  leftIcon={<AiTwotoneEdit />}
                  colorScheme="gray"
                  _focus={false}
                >
                  Edit Profile
                </Button>
              </Box>

              <Box ms={2}>
                <Button
                  as={NavLink}
                  to="/settings"
                  leftIcon={<BsFillGearFill />}
                  colorScheme="gray"
                  _focus={false}
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
                <Button
                  leftIcon={<BsPersonPlusFill />}
                  colorScheme="green"
                  _focus={false}
                >
                  Add friend
                </Button>
              </Box>

              <Box ms={1}>
                <Button
                  leftIcon={<RiMessage2Fill />}
                  colorScheme="blue"
                  _focus={false}
                >
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
  );
};

export default UserProfile;
