import React from "react";
import Post from "../Post";
import { Post as PostType } from "../../types";
import { Box, Center, Stack, Text } from "@chakra-ui/react";

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
        <Box m={[2, 4]}>
          <Center>
            <Stack spacing={5}>
              {/* <Text
                // mx={[2, 4]}
                fontSize={"3xl"}
                fontWeight={"thin"}
                color={"purple.500"}
                fontFamily={"ubuntu bold"}
              >
                Timeline
              </Text> */}

              {posts?.map((post, index) => {
                return <Post data={post} key={index} />;
              })}
            </Stack>
          </Center>
        </Box>
      )}
    </Box>
  );
};

export default PostList;
