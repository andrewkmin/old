import Info from "./Sections/Info";
import Buttons from "./Sections/Buttons";
import Content from "./Sections/Content";
// import Reactions from "./Sections/Reactions";
import { Box, Stack, useColorModeValue } from "@chakra-ui/react";

const Post = ({ data }) => {
  return (
    <Box
      my={5}
      p={[2, 3]}
      rounded={"xl"}
      border={"2px"}
      boxShadow={"md"}
      mx={[4, 3, null, null]}
      maxW={["sm", "lg", "xl"]}
      borderColor={useColorModeValue("gray.300", "gray.700")}
    >
      <Stack spacing={2}>
        {/* Post info */}
        <Info post={data} />
        {/* Post content */}
        <Content post={data} />
        {/* Post reactions */}
        {/* <Reactions post={data} /> */}
        {/* Post buttons */}
        <Buttons post={data} />
      </Stack>
    </Box>
  );
};

export default Post;
