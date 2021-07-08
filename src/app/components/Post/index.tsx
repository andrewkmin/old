import Info from "./Sections/Info";
import { PostProps } from "../../types";
import Buttons from "./Sections/Buttons";
import Content from "./Sections/Content";
import TopComment from "./Sections/TopComment";
import { Box, Stack, useColorModeValue, useDisclosure } from "@chakra-ui/react";

const Post = ({ data: post }: PostProps) => {
  return (
    <Box
      p={[2, 3]}
      rounded={"xl"}
      border={"2px"}
      boxShadow={"md"}
      minW={["sm", "md", "lg", "xl"]}
      borderColor={useColorModeValue("gray.300", "gray.700")}
    >
      <Stack spacing={2}>
        {/* Post info */}
        <Info data={post} />
        {/* Post content */}
        <Content data={post} />
        {/* Post reactions */}
        {/* <Reactions /> */}
        {/* Post buttons */}
        <Buttons data={post} />
        {/* Top comment */}
        {post?.comments?.length === 0 ? null : (
          <TopComment data={post.comments[0]} />
        )}
      </Stack>
    </Box>
  );
};

export default Post;
