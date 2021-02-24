import React from "react";
import { Box } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";

import PostList from "../components/PostList";
import CreatePost from "../components/Create/index";

export default class Home extends React.Component {
  render() {
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
  }
}
