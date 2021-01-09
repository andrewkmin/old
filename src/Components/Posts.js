import {
  Box,
  Container,
  SkeletonCircle,
  SkeletonText,
  Flex,
  Center,
  Divider,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import trunk from "trunk-js";

import _axios from "../helpers/_axios";

const PostSkeleton = () => {
  return (
    <Box borderTopRadius="xl" padding="6" boxShadow="lg" bg="white">
      <Box>
        <Flex>
          <Center>
            <SkeletonCircle size="10" />
            <SkeletonText w="sm" ms={3} noOfLines={1} />
          </Center>
        </Flex>
      </Box>
      <SkeletonText mt="4" noOfLines={4} spacing="4" />
    </Box>
  );
};

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await _axios.get("/api/posts/fetch");
      setPosts(data);
      setLoading(false);
      return data;
    };
    fetchPosts();
  }, []);

  return (
    <Box overflow="none" w="full" mt={5}>
      <Container>
        {loading ? (
          <Box>
            <PostSkeleton />
            <Divider />
            <PostSkeleton />
          </Box>
        ) : (
          <Box>
            {posts.map((post) => {
              return (
                <Box
                  key={post._id}
                  border="2px"
                  borderColor="gray.200"
                  mb={1}
                  padding="6"
                  boxShadow="md"
                  bg="white"
                  borderRadius="md"
                >
                  <Box>
                    <Flex>
                      <Center>
                        <Avatar src={post.authorImage} />
                        <Link to={`/users/${post.authorId}`}>
                          <Text ms={2} color="blue.500">
                            {trunk(post.author, 15, "...")}
                          </Text>
                        </Link>
                      </Center>
                    </Flex>
                  </Box>
                  <Text mt={2} fontSize="sm">
                    {post.text}
                  </Text>
                </Box>
              );
            })}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Posts;
