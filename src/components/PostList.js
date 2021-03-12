import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Center, Text, Spinner } from "@chakra-ui/react";

import Post from "./Post/index";
// import _axios from "../api/_axios";
import { useFetchPosts } from "../api/hooks";

const PostList = () => {
  const { accountId } = useParams();
  const [posts, setPosts] = useState([]);
  const { data, isError, isFetching, isFetched } = useFetchPosts(accountId);

  // ! TODO: Because of using hooks, when deleting the last post the "No posts yet" text doesn't show up
  const handleRemovePost = (id) => {
    return setPosts(
      posts.filter((post) => {
        return post.postData._id !== id;
      })
    );
  };

  useEffect(() => {
    if (isFetched) {
      if (data?.error) {
        setPosts([]);
      } else {
        setPosts(data);
      }
    }
    if (isError) setPosts([]);
  }, [data, isError, isFetched]);

  return (
    <Box overflow={"none"} w={"full"} mt={5}>
      {isFetching ? (
        <Center>
          <Spinner color={"blue.500"} />
        </Center> ? (
          isError
        ) : (
          <Center>
            <Text color={"red.500"} fontSize={"xl"} fontWeight={"bold"}>
              There was an error
            </Text>
          </Center>
        )
      ) : (
        <Box>
          {data?.length === 0 ? (
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
