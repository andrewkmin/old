import { useHistory, useParams } from "react-router-dom";
import { Avatar, Box, Center, Spinner, Stack, Text } from "@chakra-ui/react";
import { useFetchAccount, useFetchAccountStatus } from "../api/hooks";
import { useEffect } from "react";

// The profile page
const Profile = () => {
  const history = useHistory();
  const { accountId } = useParams();
  const { data, isFetching } = useFetchAccount(accountId);

  useEffect(() => {
    const exists = data?.status !== 404;
    if (!exists) history.push("");
    return () => {};
  });

  return (
    <Box>
      <Box>
        <Stack>
          <Avatar
            size={"lg"}
            src={data?.data?.avatar}
            name={data?.data?.firstName}
          />

          <Box>
            {isFetching && <Spinner />}
            <Text fontWeight={"semibold"} fontSize={"2xl"}>
              {data?.data.firstName} {data?.data.lastName}
            </Text>
            <Text color={"gray.400"}>{data?.data.id}</Text>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Profile;
