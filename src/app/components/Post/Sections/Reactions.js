import { Box, Text } from "@chakra-ui/react";

const Reactions = ({ data }) => {
  return (
    <Box>
      <Text fontSize={"sm"} fontWeight={"semibold"}>
        {data?.hearts?.count} hearts
      </Text>
    </Box>
  );
};

export default Reactions;
