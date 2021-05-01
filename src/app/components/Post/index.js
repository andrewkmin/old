import { Box, Progress, Stack } from "@chakra-ui/react";
import { useContext, useState } from "react";

import Info from "./Sections/Info";
import Buttons from "./Sections/Buttons";
import Content from "./Sections/Content";
import Reactions from "./Sections/Reactions";
import DataContext from "../../data/data.context";

const Post = ({ data: post, removeHandler }) => {
  const { userData } = useContext(DataContext);
  const [states, setState] = useState({
    hearted: post?.postData?.hearts?.includes(userData?._id),
    saved: false,
    deleting: false,
  });

  return (
    <Box
      my={5}
      p={[2, 3]}
      border={"1px"}
      boxShadow={"md"}
      borderRadius={"md"}
      borderColor={"gray.300"}
    >
      <Stack spacing={2}>
        {/* Post info */}
        <Info
          removeHandler={removeHandler}
          post={post}
          setState={setState}
          states={states}
        />

        {/* Post content */}
        <Content post={post} />

        {/* Post reactions */}
        <Reactions post={post} />

        {/* Post buttons */}
        <Buttons post={post} states={states} setState={setState} />

        {/* Delete indicator */}
        {states.deleting && (
          <Progress size={"xs"} isIndeterminate colorScheme="red" />
        )}
      </Stack>
    </Box>
  );
};

export default Post;
