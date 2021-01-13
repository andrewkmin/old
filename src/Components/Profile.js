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
} from "@chakra-ui/react";

import _axios from "../helpers/_axios";

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [userIsActive, setUserIsActive] = useState(false);
  const { accountId } = useParams();

  useEffect(() => {
    const fetchAccount = async () => {
      const { data } = await _axios.get(
        `/api/accounts/fetch/?accountId=${accountId}`
      );
      setUserData(data);
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

            <Center>
              <Text ms={5} fontWeight="semibold" fontSize="2xl">
                {userData.fullName}
              </Text>
            </Center>
          </Flex>

          <Box mt={10}>
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
      </Box>
    </>
  );
};

export default UserProfile;
