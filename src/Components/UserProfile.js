import fetchUserData from "../api/fetchUserData";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Avatar, Box, Container, Text } from "@chakra-ui/react";

const UserProfile = () => {
  const [data, setData] = useState({});
  const { accountId } = useParams();

  useEffect(() => {
    const fetchAccount = async () => {
      const data = await fetchUserData(accountId, "id");
      setData(data);
      return data;
    };
    fetchAccount();
  }, [accountId]);

  return (
    <>
      <Helmet>
        <meta name="description" content="Homepage" />
        <title>{`${data.fullName} — Usocial`}</title>
      </Helmet>
      <Box>
        <Container>
          <Box>
            <Avatar size="xl" name={data.fullName} src={data.pictureUrl} />
            <Text color="gray.600">{data.fullName}</Text>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default UserProfile;
