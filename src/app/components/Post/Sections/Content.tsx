import { useContext } from "react";
import { Box, Text } from "@chakra-ui/react";
import PostContext from "../../../contexts/post.context";

// Post content
const Content = () => {
  const { post: data } = useContext(PostContext);

  return (
    // Middle section
    <Box>
      {/* Rendering post text */}
      <Text fontSize={"lg"} fontFamily={"ubuntu bold"}>
        {data?.body}
      </Text>

      {/* TODO: Also include the attachments */}
    </Box>
  );
};

export default Content;
