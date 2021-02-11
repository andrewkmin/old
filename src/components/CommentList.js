import React from "react";
import Comment from "./Comment";
import { Text, Box, Center, Stack } from "@chakra-ui/react";

const CommentList = ({ comments }) => {
  return (
    <Box>
      {comments.length === 0 ? (
        <Center>
          <Text fontWeight="semibold">Be the first one to comment 🦓</Text>
        </Center>
      ) : (
        <Stack direction="column" spacing={5}>
          {comments.map((comment) => {
            return <Comment key={comment.commentData._id} data={comment} />;
          })}
        </Stack>
      )}
    </Box>
  );
};

export default CommentList;
