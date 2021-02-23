import React from "react";
import { Helmet } from "react-helmet-async";

import PostList from "../components/PostList";
import CreatePost from "../components/Create/index";

export default class Home extends React.Component {
  render() {
    return (
      <>
        <Helmet>
          <title>Usocial</title>
        </Helmet>
        <CreatePost />
        <PostList />
      </>
    );
  }
}
