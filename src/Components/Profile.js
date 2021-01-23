import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Avatar,
  Box,
  Container,
  Flex,
  Text,
  AvatarBadge,
  Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Skeleton,
  SkeletonCircle,
  Stack,
} from "@chakra-ui/react";

import Posts from "./Posts";
import _axios from "../helpers/_axios";
import verification from "../auth/verify.token";

import { RiMessage2Fill } from "react-icons/ri";
import { BsPersonPlusFill, BsFillGearFill } from "react-icons/bs";
import { AiTwotoneEdit } from "react-icons/ai";

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [userIsActive, setUserIsActive] = useState(false);
  const { accountId } = useParams();

  useEffect(() => {
    const fetchAccount = async () => {
      const { data } = await _axios.get(
        `/api/accounts/fetch/?accountId=${accountId}`
      );
      setUserData(data);
      setLoading(false);
      return data;
    };
    return fetchAccount();
  }, [accountId]);

  useEffect(() => {
    const checkWsConnection = async (data) => {
      // For checking if the user is online
      const { data: response } = await _axios.get(
        `/api/network/active/?accountId=${data._id}`
      );
      setUserIsActive(response.message);
      return response;
    };
    return checkWsConnection(userData);
  });

  return (
    <>
      <Helmet>
        <meta name="description" content="Homepage" />
        <title>{`${userData.fullName} — Usocial`}</title>
      </Helmet>
      <Box>
        <Container>
          <Flex>
            {loading ? (
              <SkeletonCircle size="20">
                <Avatar size="xl">
                  <AvatarBadge boxSize="1em" />
                </Avatar>
              </SkeletonCircle>
            ) : (
              <Avatar
                size="xl"
                name={userData.fullName}
                src={userData.pictureUrl}
              >
                <AvatarBadge
                  boxSize="1em"
                  bg={userIsActive ? "green.500" : "gray.500"}
                />
              </Avatar>
            )}

            <Center>
              <Text ms={5} fontWeight="semibold" fontSize="2xl">
                {userData.fullName}
              </Text>
            </Center>
          </Flex>

          {loading ? (
            <Skeleton mt={5} ms={2} me={2}>
              <Button>Loading</Button>
              <Button>Loading</Button>
            </Skeleton>
          ) : !verification.id ? (
            verification.verify()
          ) : verification.id === userData._id ? (
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

          <Box mt={6}>
            <Center>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>
                      <Center>Friends </Center>
                    </Th>
                    <Th>
                      <Center>Posts</Center>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <Center>{userData?.friends?.approved?.length}</Center>
                    </Td>
                    <Td>
                      <Center>{userData?.posts?.length}</Center>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Center>
          </Box>
        </Container>

        <Container mt={10}>
          <Posts />
        </Container>
      </Box>
    </>
  );
};

export default UserProfile;
