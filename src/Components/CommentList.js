import Comment from "./Comment";
import _axios from "../api/_axios";
import { Text, Box, Center, Flex, Input, Button } from "@chakra-ui/react";

const CommentList = ({ comments, postdata }) => {
  const createComment = async (event) => {
    event.preventDefault();
    const PAYLOAD = {
      comment: event.currentTarget.elements.comment.value,
    };
    const { data } = await _axios.post(
      `/api/posts/comments/create/?postId=${postdata?._id}`,
      PAYLOAD
    );

    if (!data.error) {
      // TODO
    }
  };

  return (
    <Box>
      <Box>
        {comments.length === 0 ? (
          <Center>
            <Text fontWeight="semibold">Be the first one to comment 🦓</Text>
          </Center>
        ) : (
          comments.map((comment) => {
            return <Comment data={comment} />;
          })
        )}
      </Box>

      <Box mt={5}>
        <Center>
          <form autoComplete="off" onSubmit={(event) => createComment(event)}>
            <Flex>
              <Box me={1}>
                <Input
                  placeholder="Comment something..."
                  name="comment"
                  type="text"
                  w="full"
                />
              </Box>

              <Box ms={1}>
                <Button w="full" _focus={false} type="submit">
                  Comment!
                </Button>
              </Box>
            </Flex>
          </form>
        </Center>
      </Box>
    </Box>
  );
};

export default CommentList;
