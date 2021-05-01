import { Box } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import PostList from "../../PostList";
import axios from "../../../api/axios";
import CreatePost from "../../Create/index";
import { verify } from "../../../auth/verification";
import DataContext from "../../../data/data.context";

const Timeline = ({ data: otherUserData }) => {
  const [posts, setPosts] = useState([]);
  const { userData } = useContext(DataContext);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(
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
      {userData?._id === otherUserData?._id && (
        <CreatePost _setPosts={setPosts} _posts={posts} />
      )}
      <PostList _isFetching={isFetching} _posts={posts} />
    </Box>
  );
};

export default Timeline;
