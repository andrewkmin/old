import {
  Box,
  Center,
  Link,
  Text,
  Avatar,
  CircularProgress,
  AvatarBadge,
  Stack,
} from "@chakra-ui/react";

import verification from "../../../auth/verification";

const User = ({ data, isFetching, connected }) => {
  return (
    <Box p={5} border={"2px"} borderColor={"gray.200"} borderRadius={"lg"}>
      <Stack spacing={1.5}>
        <Box>
          <Center>
            <Link target={"_blank"} href={data?.avatar}>
              <Avatar
                size={"xl"}
                name={`${data?.firstName || ""} ${data?.lastName || ""}`}
                src={data?.avatar}
              >
                <AvatarBadge
                  boxSize={"1em"}
                  bg={connected ? "green.500" : "gray.500"}
                />
              </Avatar>
            </Link>
          </Center>
        </Box>

        <Box>
          <Center>
            {isFetching ? (
              <CircularProgress isIndeterminate mt={2} />
            ) : (
              <Text
                fontSize={["lg", "xl"]}
                fontWeight={"bold"}
              >{`${data?.firstName} ${data?.lastName}`}</Text>
            )}
          </Center>
        </Box>

        <Box>
          <Center>
            {isFetching ? null : (
              <Text fontSize={["xs", "md"]} fontWeight={"semibold"}>
                {data?.bio?.length === 0 && verification.id === data._id
                  ? "Your bio is empty so here's a placeholder"
                  : data?.bio?.length === 0 && verification.id !== data._id
                  ? "This user's bio is empty so here's a placeholder 🤔"
                  : data?.bio}
              </Text>
            )}
          </Center>
        </Box>
      </Stack>
    </Box>
  );
};

export default User;
