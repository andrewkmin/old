import { Box } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";

import PostList from "../components/PostList";
import CreatePost from "../components/Create/index";

const Home = () => {
  return (
    <Box>
      <Helmet>
        <title>Usocial</title>
      </Helmet>

      <Box>
        <CreatePost />
        <PostList />
      </Box>
    </Box>
  );
};

export default Home;
