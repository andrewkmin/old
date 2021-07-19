import { Avatar, Box, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { User as UserType } from "../../../../types";

interface UserProps {
  user: Partial<UserType>;
}

const User = ({ user }: UserProps) => (
  <Box
    p={2}
    border={"2px"}
    rounded={"2xl"}
    borderColor={useColorModeValue("gray.200", "gray.600")}
  >
    <Stack>
      <Stack alignItems={"center"} direction={"row"}>
        <Avatar name={user?.username} src={user?.avatar} />
        <NavLink to={`/@${user?.username}`}>
          <Stack alignItems={"center"} direction={"row"}>
            <Text fontFamily={"ubuntu bold"} isTruncated>
              {user.first_name} {user.last_name}
            </Text>
            <Text
              color={useColorModeValue("gray.500", "gray.400")}
              fontSize={"sm"}
            >
              @{user?.username}
            </Text>
          </Stack>
        </NavLink>
      </Stack>
    </Stack>
  </Box>
);

export default User;
