import { Box } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import CreatePost from "../components/Create/index";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Usocial</title>
      </Helmet>

      <Box>
        <CreatePost />
        {/* <Posts /> */}
      </Box>
    </>
  );
};

export default Home;
