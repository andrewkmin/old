import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import {
  Box,
  // Center, Text, Spinner
} from "@chakra-ui/react";

// import Post from "./Post/index";
// import axios from "../api/axios";

// TODO: Continue implementation
const PostList = () => {
  // const [posts, setPosts] = useState([]);

  // Function for handling post removal
  // const handleRemovePost = (id) => {
  //   const updatedList = posts
  //     // Filtering all the post and removing the one with the matching ID
  //     .filter((post) => {
  //       return post._id !== id;
  //     })
  //     // Sorting posts by date
  //     .sort((a, b) => {
  //       return new Date(b.updatedAt) - new Date(a.updatedAt);
  //     });

  //   // Updating
  //   setPosts(updatedList);
  // };

  useEffect(() => {
    // TODO: Implement
    // const fetchPosts = async () => {};

    return () => {};
  }, []);

  return (
    <Box overflow={"none"} w={"full"} mt={5}>
      {/* TODO: Implement */}
    </Box>
  );
};

export default PostList;
