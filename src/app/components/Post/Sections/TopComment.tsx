import { Box, useColorModeValue } from "@chakra-ui/react";
import { Comment } from "../../../types/index";

interface TopCommentProps {
  data: Comment;
}

const TopComment = ({ data: comment }: TopCommentProps) => {
  return (
    <Box
      p={2}
      m={[2, 3]}
      rounded={"md"}
      border={"2px"}
      borderColor={useColorModeValue("gray.300", "gray.700")}
    ></Box>
  );
};

export default TopComment;
