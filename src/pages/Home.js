import { Box } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";

import PostList from "../components/PostList";
import CreatePost from "../components/Create/index";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Usocial</title>
      </Helmet>

      <Box>
        <Box>
          <CreatePost />
          <PostList />
        </Box>
      </Box>
    </>
  );
};

export default Home;
