import {
  Box,
  Center,
  Link,
  Text,
  Avatar,
  CircularProgress,
  AvatarBadge,
  Stack,
  // Tooltip,
} from "@chakra-ui/react";
// import { GoVerified } from "react-icons/go";
// import { RiTeamFill } from "react-icons/ri";

const User = ({ data, isFetching, status }) => {
  return (
    <Box p={5} border={"2px"} borderColor={"gray.200"} borderRadius={"lg"}>
      <Stack spacing={1}>
        <Box>
          <Center>
            <Link target={"_blank"} href={data?.avatar}>
              <Avatar
                size={"xl"}
                name={`${data?.firstName || ""} ${data?.lastName || ""}`}
                src={data?.avatar}
              >
                {status.connected && (
                  <AvatarBadge boxSize={"1em"} bg={"green.500"} />
                )}
              </Avatar>
            </Link>
          </Center>
        </Box>

        <Box>
          <Stack>
            <Center>
              {isFetching ? (
                <CircularProgress isIndeterminate mt={2} />
              ) : (
                <Center>
                  <Text
                    fontSize={["lg", "xl"]}
                    fontWeight={"bold"}
                  >{`${data?.firstName} ${data?.lastName}`}</Text>
                </Center>
              )}
            </Center>
          </Stack>
        </Box>

        {isFetching ? null : data?.bio?.length === 0 ? null : (
          <Box>
            <Center>
              <Text fontSize={["xs", "md"]} fontWeight={"semibold"}>
                {data?.bio}
              </Text>
            </Center>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default User;
