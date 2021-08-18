import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import PostList from "../components/PostList";
import CreatePost from "../components/Create";
import { useFetchInfiniteResource } from "../utils/hooks";
import PostListContext from "../contexts/post.list.context";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { Post } from "../types";

// The homepage
const Home = () => {
  // Keeping track of the cursor
  const [cursor, setCursor] = useState<string | null>(null);
  // Setting the cursor
  const { data, hasNextPage, isFetchingNextPage, isLoading, setData, next } =
    useFetchInfiniteResource<Partial<Post>>({
      cursor,
      config: {
        enabled: true,
      },
      queryParam: "cursor",
      nextPageParam: "next",
      url: "/api/discover/posts",
    });

  useBottomScrollListener(
    () => {
      if (hasNextPage && next !== null) setCursor(next!!);
    },
    {
      offset: 500,
    }
  );

  return (
    <Box>
      <Box pb={10} pt={10}>
        <Container>
          {isLoading ? (
            <Center minH={"80vh"}>
              <Spinner size={"lg"} />
            </Center>
          ) : (
            <Stack spacing={5}>
              <PostListContext.Provider value={{ data, setData }}>
                {/* For creating a post */}
                <CreatePost />

                <Box>
                  <Flex alignItems={"center"} justifyContent={"space-between"}>
                    <Box>
                      <Text
                        fontSize={"3xl"}
                        fontWeight={"thin"}
                        fontFamily={"ubuntu bold"}
                      >
                        Timeline
                      </Text>
                    </Box>
                  </Flex>
                </Box>

                {/* List of the posts */}
                <PostList />

                {/* Misc */}
                <Stack spacing={5}>
                  {!hasNextPage && (
                    <Center p={5} bgColor={"gray.300"} rounded={"lg"}>
                      <Text
                        textAlign={"center"}
                        fontWeight={"semibold"}
                        fontSize={["md", null, "lg"]}
                      >
                        Looks like you have reached the end 🎉
                      </Text>
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
                        isDisabled={isFetchingNextPage}
                        onClick={() => {
                          if (hasNextPage && next) setCursor(next);
                        }}
                      >
                        Load more
                      </Button>
                    </Center>
                  )}
                </Stack>
              </PostListContext.Provider>
            </Stack>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
