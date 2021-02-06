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
import { useParams } from "react-router-dom";
import { AiTwotoneEdit } from "react-icons/ai";
import { RiMessage2Fill } from "react-icons/ri";
import verification from "../auth/verification.js";
import React, { useEffect, useRef, useState } from "react";
import { BsPersonPlusFill, BsFillGearFill } from "react-icons/bs";

const UserProfile = () => {
  const { accountId } = useParams();
  const [userData, setUserData] = useState({});
  const [userIsActive, setUserIsActive] = useState(false);

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
      setUserIsActive(_userIsActive.message);
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
              bg={userIsActive ? "green.500" : "gray.500"}
            />
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
              <Box me={1}>
                <Button
                  leftIcon={<AiTwotoneEdit />}
                  colorScheme="gray"
                  _focus={false}
                >
                  Edit Profile
                </Button>
              </Box>

              <Box ms={1}>
                <Button
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
        <PostList />
      </Container>
    </Box>
  );
};

export default UserProfile;
