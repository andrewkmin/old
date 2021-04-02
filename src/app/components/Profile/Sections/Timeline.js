import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import PostList from "../../PostList";
import _axios from "../../../api/_axios";
import CreatePost from "../../Create/index";
import verification from "../../../auth/verification";

const Timeline = ({ data: userData }) => {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const verify = async () => {
      await verification.verify();
    };

    const fetchPosts = async () => {
      try {
        const { data } = await _axios.get(
          `/api/posts/fetch/${
            userData?._id ? `?accountId=${userData._id}` : ``
          }`
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

    verify();
    fetchPosts();
    return () => {};
  }, [userData?._id]);

  return (
    <Box mt={10}>
      {verification.id === userData?._id && (
        <CreatePost _setPosts={setPosts} _posts={posts} />
      )}
      <PostList _isFetching={isFetching} _posts={posts} />
    </Box>
  );
};

export default Timeline;
