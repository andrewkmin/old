import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import PostList from "../../PostList";
import _axios from "../../../api/_axios";
import CreatePost from "../../Create/index";
import verification from "../../../auth/verification";

const Timeline = ({ data }) => {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const verify = async () => {
      await verification.verify();
    };

    const fetchPosts = async () => {
      try {
        const { data: posts } = await _axios.get(
          `/api/posts/fetch/${data?._id ? `?accountId=${data._id}` : ``}`
        );

        if (!posts?.error) {
          setIsFetching(false);
          setPosts(posts);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error(error);
        return setPosts([]);
      }
    };

    verify();
    fetchPosts();
    return () => {};
  }, [data?._id]);

  return (
    <Box mt={10}>
      {verification.id === data?._id && (
        <CreatePost _setPosts={setPosts} _posts={posts} />
      )}
      <PostList _isFetching={isFetching} _posts={posts} />
    </Box>
  );
};

export default Timeline;
