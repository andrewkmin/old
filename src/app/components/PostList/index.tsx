import React from "react";
import Post from "../Post";
import { Post as PostType } from "../../types";
import { Box, Center, Text } from "@chakra-ui/react";

interface PostListProps {
  data?: PostType[];
  noPostsText?: string;
}

const PostList: React.FC<PostListProps> = ({ data: posts, noPostsText }) => {
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
        posts?.map((post, index) => {
          return <Post data={post} key={index} />;
        })
      )}
    </Box>
  );
};

export default PostList;
