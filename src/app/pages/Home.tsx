import { useState } from "react";
import { useQuery } from "react-query";
import { FetchPosts } from "../api/functions";
import PostList from "../components/PostList";
import CreatePost from "../components/Create";
import {
  Box,
  // Button,
  Center,
  Container,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";

// The homepage
const Home = () => {
  const [page, setPage] = useState(0);
  const { data, isLoading, isFetching } = useQuery(
    ["posts", page],
    () => FetchPosts(page),
    {
      keepPreviousData: true,
    }
  );

  return (
    <Box>
      {isLoading ? (
        <Container>
          <Center minH={"80vh"}>
            <Spinner size={"lg"} />
          </Center>
        </Container>
      ) : (
        <Container>
          <Stack spacing={5}>
            <CreatePost />

            <PostList
              state={{
                data,
                noPostsText: "There are no posts yet",
              }}
            />

            <Stack spacing={6}>
              {/* <Center>
                <Button
                  size={"lg"}
                  rounded={"full"}
                  colorScheme={"purple"}
                  bgColor={"purple.400"}
                >
                  Load more
                </Button>
              </Center> */}

              {isFetching && (
                <Center>
                  <Stack>
                    <Text
                      fontSize={"lg"}
                      fontWeight={"thin"}
                      fontFamily={"ubuntu bold"}
                    >
                      Loading more
                    </Text>
                    <Center>
                      <Spinner />
                    </Center>
                  </Stack>
                </Center>
              )}
            </Stack>
          </Stack>
        </Container>
      )}
    </Box>
  );
};

export default Home;
