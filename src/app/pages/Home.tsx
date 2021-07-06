import { useFetchPosts } from "../api/hooks";
import PostList from "../components/PostList";
import CreatePost from "../components/Create/index";
import { Box, Center, Spinner, Stack } from "@chakra-ui/react";

// The homepage
const Home = () => {
  const { data: posts, isFetching: postsAreFetching } = useFetchPosts();

  return (
    <Box px={10}>
      {postsAreFetching ? (
        <Center minH={"75vh"}>
          <Spinner size={"lg"} />
        </Center>
      ) : (
        <Center>
          <Box maxW={"xl"}>
            <Stack spacing={2}>
              <CreatePost />
              <PostList data={posts} noPostsText={"There are no posts yet"} />
            </Stack>
          </Box>
        </Center>
      )}
    </Box>
  );
};

export default Home;
