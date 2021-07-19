import Info from "./Sections/Info";
import { PostProps } from "../../types";
import Buttons from "./Sections/Buttons";
import Content from "./Sections/Content";
import TopComment from "./components/TopComment";
import { Box, Stack, useColorModeValue } from "@chakra-ui/react";

const Post = ({ data: post, setPosts }: PostProps) => {
  return (
    <Box
      p={[2, 3]}
      rounded={"xl"}
      border={"2px"}
      boxShadow={"sm"}
      bgColor={useColorModeValue("white", "gray.700")}
      borderColor={useColorModeValue("gray.300", "gray.600")}
    >
      <Stack spacing={2}>
        {/* Post info */}
        <Info data={post} />
        {/* Post content */}
        <Content data={post} />
        {/* Post buttons */}
        <Buttons data={post} />
        {/* Top comment */}
        {post?.comments?.length !== 0 && (
          <TopComment data={post?.comments[0]} />
        )}
      </Stack>
    </Box>
  );
};

export default Post;
