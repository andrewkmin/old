import {
  Box,
  Container,
  Text,
  useColorModeValue,
  Badge,
  Tooltip,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/all";

const Notification = ({ data }) => {
  return (
    <Box
      py={3}
      border={"2px"}
      borderRadius={"lg"}
      bg={useColorModeValue("gray.50", "gray.700")}
      borderColor={useColorModeValue("gray.300", "gray.700")}
    >
      {/* <CloseButton /> */}
      <Container>
        {data?.notificationData?.type ===
        "accepted_friend_request".toUpperCase() ? (
          <Text>TODO</Text>
        ) : data?.notificationData?.type ===
          "incoming_friend_request".toUpperCase() ? (
          <Box>
            {!data?.notificationData?.seen && (
              <Badge variant={"solid"} my={2} colorScheme={"red"}>
                New Notification
              </Badge>
            )}
            <Box>
              <span>
                <Text fontSize={"md"} fontWeight={"bold"}>
                  <Text color={"blue.500"}>
                    <Link to={`/users/${data?.userData?._id}`}>
                      {`${data?.userData?.firstName} ${data?.userData?.lastName}`}
                    </Link>
                  </Text>{" "}
                  <span>sent you a friend request</span>
                </Text>
              </span>
            </Box>

            <Box mt={5}>
              <Stack direction={"row"} spacing={1.5}>
                <Tooltip label={"Accept friend request"}>
                  <IconButton
                    size={"md"}
                    icon={<FaCheck />}
                    colorScheme={"blue"}
                    isRound
                  />
                </Tooltip>

                <Tooltip label={"Decline friend request"}>
                  <IconButton
                    size={"md"}
                    icon={<FaTimes />}
                    colorScheme={"red"}
                    isRound
                  />
                </Tooltip>
              </Stack>
            </Box>
          </Box>
        ) : (
          <Box></Box>
        )}
      </Container>
    </Box>
  );
};

export default Notification;
