import Post from "./Post";
import _axios from "../api/_axios";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Box, Container, Center, Text, Spinner } from "@chakra-ui/react";

const PostList = () => {
  const { accountId } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await _axios.get(
        `/api/posts/fetch/${accountId ? `?accountId=${accountId}` : ``}`
      );
      setPosts(data);
      setLoading(false);
      return data;
    };
    fetchPosts();
  }, [accountId]);

  return (
    <Box overflow="none" w="full" mt={5}>
      <Container>
        {loading ? (
          <Center>
            <Spinner color="blue.500" />
          </Center>
        ) : (
          <Box>
            {posts?.length === 0 ? (
              <Center>
                <Text color="gray.600" fontSize="xl" fontWeight="bold">
                  No posts yet
                </Text>
              </Center>
            ) : (
              posts.map((post) => {
                return <Post key={post?.postData?._id} data={post} />;
              })
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default PostList;
