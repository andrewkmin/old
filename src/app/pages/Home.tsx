import { useState } from "react";
import { useQuery } from "react-query";
import { FetchPosts } from "../api/functions";
import PostList from "../components/PostList";
import CreatePost from "../components/Create";
import { Box, Center, Spinner, Stack, Text } from "@chakra-ui/react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

// The homepage
const Home = () => {
  const [page, setPage] = useState(0);
  const { data, isPreviousData, isLoading, isFetching } = useQuery(
    ["posts", page],
    () => FetchPosts(page),
    {
      keepPreviousData: true,
    }
  );

  useBottomScrollListener(() => {
    if (!isPreviousData && data) setPage(page + 1);
  });

  return (
    <Box px={10}>
      {isLoading ? (
        <Center minH={"75vh"}>
          <Spinner size={"lg"} />
        </Center>
      ) : (
        <Box>
          <Center>
            <Stack spacing={2}>
              <CreatePost />

              <PostList data={data!!} noPostsText={"There are no posts yet"} />

              {isFetching ? (
                <Center>
                  <Spinner />
                </Center>
              ) : null}
            </Stack>
          </Center>
        </Box>
      )}
    </Box>
  );
};

export default Home;
