import { useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Center, Text, Spinner } from "@chakra-ui/react";

import Post from "./Post/index";
import _axios from "../api/_axios";

const PostList = () => {
  const { accountId } = useParams();
  const fetchPosts = useRef(() => {});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  fetchPosts.current = async () => {
    const { data } = await _axios.get(
      `/api/posts/fetch/${accountId ? `?accountId=${accountId}` : ``}`
    );
    setPosts(data);
    setLoading(false);
    return data;
  };

  const handleRemovePost = (id) => {
    setPosts((prev) => prev.filter((post) => post.postData._id !== id));
  };

  useEffect(() => {
    fetchPosts.current();
  }, []);

  return (
    <Box overflow={"none"} w={"full"} mt={5}>
      <Container>
        {loading ? (
          <Center>
            <Spinner color={"blue.500"} />
          </Center>
        ) : (
          <Box>
            {posts?.length === 0 ? (
              <Center>
                <Text color={"gray.600"} fontSize={"xl"} fontWeight={"bold"}>
                  No posts yet
                </Text>
              </Center>
            ) : (
              posts.map((post) => {
                return (
                  <Post
                    removeHandler={(postId) => handleRemovePost(postId)}
                    key={post?.postData?._id}
                    data={post}
                  />
                );
              })
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default PostList;
