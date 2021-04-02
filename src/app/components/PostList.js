import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Center, Text, Spinner } from "@chakra-ui/react";

import Post from "./Post/index";
import _axios from "../api/_axios";

const PostList = ({ _posts, _isFetching }) => {
  const { accountId } = useParams();
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const handleRemovePost = (id) => {
    setPosts(
      posts
        .filter((post) => {
          return post.postData._id !== id;
        })
        .sort((a, b) => {
          return b?.postData?.datefield - a?.postData?.datefield;
        })
    );
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await _axios.get(
          `/api/posts/fetch/${accountId ? `?accountId=${accountId}` : ``}`
        );

        if (!data?.error) {
          setIsFetching(false);
          setPosts(
            data.sort((a, b) => {
              return (
                new Date(b?.postData?.datefield).getTime() -
                new Date(a?.postData?.datefield).getTime()
              );
            })
          );
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error(error);
        return setPosts([]);
      }
    };

    if (!_posts) {
      fetchPosts();
    } else {
      setPosts(_posts);
      setIsFetching(_isFetching);
    }

    return () => {};
  }, [accountId, _posts, _isFetching]);

  return (
    <Box overflow={"none"} w={"full"} mt={5}>
      {isFetching ? (
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
            posts?.map((post) => {
              return (
                <Post
                  removeHandler={(postId) => handleRemovePost(postId)}
                  key={post.postData._id}
                  data={post}
                />
              );
            })
          )}
        </Box>
      )}
    </Box>
  );
};

export default PostList;
