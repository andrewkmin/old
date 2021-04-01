import {
  Avatar,
  Box,
  Center,
  Flex,
  IconButton,
  Stack,
  Text,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import DataContext from "../data/data.context";
import { formatDistanceToNow } from "date-fns";
import { BiHeart, BiReply, BiTrash } from "react-icons/bi";

const Comment = ({ data: comment }) => {
  const { userData } = useContext(DataContext);

  return (
    <Box>
      <Flex>
        <Avatar
          loading={"lazy"}
          name={`${comment.authorData.firstName} ${comment.authorData.lastName}`}
          src={comment.authorData.avatar}
        />

        <Center>
          <Box ms={2}>
            <Flex direction="column">
              <Box>
                <Link to={`/users/${comment.commentData.authorId}`}>
                  <Text
                    fontWeight="semibold"
                    color={useColorModeValue("blue.500", "blue.200")}
                  >
                    {`${comment.authorData.firstName} ${comment.authorData.lastName}`}
                  </Text>
                </Link>
                <Text fontSize="xs" color="gray.500">
                  {formatDistanceToNow(
                    new Date(comment.commentData.datefield),
                    {
                      addSuffix: true,
                      includeSeconds: false,
                    }
                  )}
                </Text>
              </Box>
            </Flex>
          </Box>
        </Center>
      </Flex>
      <Box mt={2}>
        <Text fontWeight="bold" fontSize="md">
          {comment.commentData.comment}
        </Text>

        <Stack direction="row" spacing={2} mt={2} mb={3}>
          <IconButton size="sm" icon={<BiHeart />} isRound />
          <IconButton size="sm" icon={<BiReply />} isRound />

          {comment.authorData._id === userData._id && (
            <IconButton
              colorScheme="red"
              size="sm"
              icon={<BiTrash />}
              isRound
            />
          )}
        </Stack>
      </Box>
      <Divider />
    </Box>
  );
};

export default Comment;
