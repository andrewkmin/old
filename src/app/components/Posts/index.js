import Post from "../Post";
import { Box } from "@chakra-ui/layout";
import { useFetchPosts } from "../../api/hooks";
import { Spinner, Text } from "@chakra-ui/react";

const Posts = ({ accountId = null }) => {
  const { data, isFetching } = useFetchPosts(accountId);

  return (
    <Box>
      <Box pt={5}>
        {isFetching && <Spinner />}

        {data?.map((post) => {
          return <Post key={post.id} data={post} />;
        })}

        {data?.length === 0 && <Text>There are no posts yet</Text>}
      </Box>
    </Box>
  );
};

export default Posts;
