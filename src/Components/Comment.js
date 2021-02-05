import { Box } from "@chakra-ui/react";

const Comment = ({ data: comment }) => {
  return (
    <Box>
      <Box>{comment.text}</Box>
    </Box>
  );
};

export default Comment;
