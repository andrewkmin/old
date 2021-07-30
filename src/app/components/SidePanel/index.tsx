import { Avatar, Box, Stack, Text } from "@chakra-ui/react";
import { useContext } from "react";
import DataContext from "../../data/data.context";

const SideInfo = () => {
  const { userData } = useContext(DataContext);

  return (
    <Box p={5} rounded={"xl"}>
      <Box>
        <Stack direction={"row"} alignItems={"center"}>
          <Avatar name={userData?.username} src={userData?.avatar} />
          <Text fontSize={"md"}>
            Hi, {userData?.first_name} {userData?.last_name} 👋
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default SideInfo;
