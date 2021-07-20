import { PostProps } from "../../../types";
import { Box, Text } from "@chakra-ui/react";

// Post content
const Content = ({ data }: PostProps) => {
  return (
    // Middle section
    <Box>
      {/* Rendering post text */}
      <Text fontSize={"lg"}>{data.body}</Text>

      {/* TODO: Also include the attachments */}
    </Box>
  );
};

export default Content;
