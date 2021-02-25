import { Box } from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";

import Top from "./components/Top";
import Bottom from "./components/Bottom";
import Middle from "./components/Middle";
import Reactions from "./components/Reactions";

import DataContext from "../../data/data.context";

const Post = ({ data: post, removeHandler }) => {
  const { userData } = useContext(DataContext);
  const [states, setState] = useState({
    hearted: false,
    saved: false,
  });

  const setData = useRef(() => {});
  setData.current = () => {
    if (post?.postData?.hearts?.includes(userData._id)) {
      return setState({ hearted: true });
    }
  };

  useEffect(() => {
    setData.current();
  }, []);

  return (
    // Base Container
    <Box
      p={[3, 4, 5]}
      my={5}
      border={"1px"}
      boxShadow={"md"}
      borderRadius={"md"}
      borderColor={"gray.300"}
    >
      {/* Top section */}
      <Top
        removeHandler={removeHandler}
        post={post}
        setState={setState}
        states={states}
      />

      {/* Middle section */}
      <Middle post={post} />

      {/* Reactions section */}
      <Reactions post={post} />

      {/* Bottom section */}
      <Bottom post={post} states={states} setState={setState} />
    </Box>
  );
};

export default Post;
