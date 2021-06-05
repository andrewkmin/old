import { Box } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import PostList from "../../PostList";
import axios from "../../../api/axios";
import CreatePost from "../../Create/index";
import DataContext from "../../../data/data.context";

const Timeline = ({ data: otherUserData }) => {
  const [posts, setPosts] = useState([]);
  const { userData } = useContext(DataContext);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        `/api/posts/fetch/${userData?._id ? `?accountId=${userData._id}` : ``}`
      );

      if (response.status === 200) {
        const { data } = response;

        setIsFetching(false);
        setPosts(
          data.sort((a, b) => {
            return new Date(b?.updatedAt) - new Date(a?.updatedAt);
          })
        );
      } else setPosts([]);
    };

    fetchPosts();
    return () => {};
  }, [userData?._id]);

  return (
    <Box mt={10}>
      {userData?._id === otherUserData?._id && (
        <CreatePost _setPosts={setPosts} _posts={posts} />
      )}
      <PostList _isFetching={isFetching} _posts={posts} />
    </Box>
  );
};

export default Timeline;
