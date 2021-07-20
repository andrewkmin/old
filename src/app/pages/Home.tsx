import {
  Box,
  Button,
  Center,
  Container,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FetchPosts } from "../api/functions";
import PostList from "../components/PostList";
import CreatePost from "../components/Create";
import { useInfiniteQuery } from "react-query";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

// The homepage
const Home = () => {
  // Infinite scroll implementation
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isPreviousData,
  } = useInfiniteQuery(
    "posts",
    async ({ pageParam = 0 }) => await FetchPosts(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage?.next ?? false,
      getPreviousPageParam: (firstPage) => firstPage?.prev ?? false,
    }
  );

  useBottomScrollListener(() => {
    if (hasNextPage && !isPreviousData) fetchNextPage();
  });

  return (
    <Box>
      {/* <SideInfo /> */}
      <Box pb={10} pt={10}>
        <Container>
          {isLoading ? (
            <Center minH={"80vh"}>
              <Spinner size={"lg"} />
            </Center>
          ) : (
            <Stack spacing={5}>
              <CreatePost />

              <PostList
                state={{
                  pages: data?.pages,
                  noPostsText: "There are no posts yet",
                }}
              />

              <Stack spacing={6}>
                {!hasNextPage && (
                  <Center>
                    <Text>Looks like you have reached the end 🎉</Text>
                  </Center>
                )}

                {hasNextPage && (
                  <Center>
                    <Button
                      size={"md"}
                      rounded={"xl"}
                      colorScheme={"purple"}
                      bgColor={"purple.400"}
                      isLoading={isFetchingNextPage}
                      onClick={() => fetchNextPage()}
                      isDisabled={isFetchingNextPage}
                    >
                      Load more
                    </Button>
                  </Center>
                )}
              </Stack>
            </Stack>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
