import Post from "../Post";
import { useContext } from "react";
import { Box, Stack } from "@chakra-ui/react";
import { Post as PostType } from "../../types";
import PostListContext from "../../contexts/post.list.context";

const PostList = () => {
  const { data } = useContext(PostListContext);

  return (
    <Box>
      <Stack spacing={5}>
        {data?.map((post: Partial<PostType>) => {
          return <Post data={post} key={post.id} />;
        })}
      </Stack>
    </Box>
  );
};

export default PostList;
