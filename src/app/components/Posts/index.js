import Post from "../Post";
import { Box } from "@chakra-ui/layout";
import { useFetchPosts } from "../../api/hooks";

const Posts = ({ accountId = null }) => {
  const {
    data,
    // isFetching
  } = useFetchPosts(accountId);

  return (
    <Box>
      {data?.map((post) => {
        return <Post key={post.id} data={post} />;
      })}
    </Box>
  );
};

export default Posts;
