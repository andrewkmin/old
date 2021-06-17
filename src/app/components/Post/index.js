import { useContext } from "react";
import { Box, Stack } from "@chakra-ui/react";

import Info from "./Sections/Info";
import Buttons from "./Sections/Buttons";
import Content from "./Sections/Content";
import Reactions from "./Sections/Reactions";
import DataContext from "../../data/data.context";

const Post = ({ data }) => {
  const { userData } = useContext(DataContext);

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
        <Info post={data} />
        {/* Post content */}
        <Content post={data} />
        {/* Post reactions */}
        <Reactions post={data} />
        {/* Post buttons */}
        <Buttons post={data} />
      </Stack>
    </Box>
  );
};

export default Post;
