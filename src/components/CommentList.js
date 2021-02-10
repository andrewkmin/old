import React from "react";
import Comment from "./Comment";
import { Text, Box, Center, List, Divider, ListItem } from "@chakra-ui/react";

const CommentList = ({ comments }) => {
  return (
    <Box>
      {comments.length === 0 ? (
        <Center>
          <Text fontWeight="semibold">Be the first one to comment 🦓</Text>
        </Center>
      ) : (
        <List spacing={5}>
          {comments.map((comment) => {
            return (
              <ListItem key={comment.commentData._id}>
                <Comment data={comment} />
                <Divider />
              </ListItem>
            );
          })}
        </List>
      )}
    </Box>
  );
};

export default CommentList;
