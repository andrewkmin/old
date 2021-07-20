import React from "react";
import Post from "../Post";
import { Post as PostType } from "../../types";
import { Box, Center, Stack, Text } from "@chakra-ui/react";
import { InfiniteData } from "react-query";

interface PostListProps {
  state: PostListStateProps;
}

interface PostListStateProps {
  noPostsText?: string;
  pages?: InfiniteData<PostType[]>["pages"];
}

const PostList = ({ state: { pages, noPostsText } }: PostListProps) => {
  return (
    <Box>
      {pages?.length === 0 ? (
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
            {pages?.map((page: any) => {
              return page?.data?.map((post: PostType) => {
                return <Post data={post} key={post.id} />;
              });
            })}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default PostList;
