import Info from "./Sections/Info";
import { PostProps } from "../../types";
import Buttons from "./Sections/Buttons";
import Content from "./Sections/Content";
import Reactions from "./Sections/Reactions";
import { Box, Stack, useColorModeValue } from "@chakra-ui/react";

const Post = ({ data: post }: PostProps) => {
  return (
    <Box
      p={[2, 3]}
      maxW={"xl"}
      rounded={"xl"}
      border={"2px"}
      boxShadow={"md"}
      minW={["sm", "lg", "xl"]}
      borderColor={useColorModeValue("gray.300", "gray.700")}
    >
      <Stack spacing={2}>
        {/* Post info */}
        <Info data={post} />
        {/* Post content */}
        <Content data={post} />
        {/* Post reactions */}
        <Reactions />
        {/* Post buttons */}
        <Buttons />
      </Stack>
    </Box>
  );
};

export default Post;
