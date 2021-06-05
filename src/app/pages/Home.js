import { Helmet } from "react-helmet-async";
import { Box, Container } from "@chakra-ui/react";

import CreatePost from "../components/Create/index";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Usocial</title>
      </Helmet>

      <Box>
        <Box>
          <Container>
            <CreatePost />
            {/* <PostList /> */}
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Home;
