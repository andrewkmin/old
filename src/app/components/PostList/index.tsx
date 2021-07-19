import React from "react";
import Post from "../Post";
import { Post as PostType } from "../../types";
import { Box, Center, Stack, Text } from "@chakra-ui/react";

interface PostListProps {
  state: PostListStateProps;
}

interface PostListStateProps {
  data?: PostType[];
  noPostsText?: string;
}

const PostList = ({ state: { data: posts, noPostsText } }: PostListProps) => {
  return (
    <Box>
      {posts?.length === 0 ? (
        <Center>
          <Text
            fontSize={"lg"}
            fontWeight={"medium"}
            fontFamily={"ubuntu bold"}
          >
            {noPostsText}
          </Text>
        </Center>
      ) : (
        <Box>
          <Stack spacing={5}>
            {posts?.map((post, index) => {
              return <Post data={post} key={index} />;
            })}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default PostList;
