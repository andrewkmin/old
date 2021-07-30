import { useState } from "react";
import Info from "./Sections/Info";
import { PostProps } from "../../types";
import Buttons from "./Sections/Buttons";
import Content from "./Sections/Content";
import PostContext from "../../contexts/post.context";
import { Box, Progress, Stack, useColorModeValue } from "@chakra-ui/react";

const Post = ({ data }: PostProps) => {
  const [post, setPost] = useState({ ...data, isBeingDeleted: false });

  return (
    <Box
      p={3}
      rounded={"xl"}
      boxShadow={"md"}
      style={{
        opacity: post.isBeingDeleted ? "0.8" : "initial",
      }}
      bgColor={useColorModeValue("white", "gray.700")}
      userSelect={post.isBeingDeleted ? "none" : "initial"}
      pointerEvents={post.isBeingDeleted ? "none" : "initial"}
    >
      <PostContext.Provider value={{ post, setPost }}>
        <Stack spacing={2}>
          {/* Post info */}
          <Info />
          {/* Post content */}
          <Content />
          {/* Post buttons */}
          <Buttons />
          {/* Deletion indicator */}
          {post?.isBeingDeleted && (
            <Progress
              my={2}
              size={"xs"}
              rounded={"xl"}
              isIndeterminate
              colorScheme={"red"}
            />
          )}
        </Stack>
      </PostContext.Provider>
    </Box>
  );
};

export default Post;
