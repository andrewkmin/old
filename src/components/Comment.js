import {
  Avatar,
  Box,
  Center,
  Flex,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DataContext from "../data/data.context";
import { formatDistanceToNow } from "date-fns";
import React, { useContext, useState } from "react";
import { BiHeart, BiReply, BiTrash } from "react-icons/bi";

const Comment = ({ data: _comment }) => {
  const { userData: currentAccount } = useContext(DataContext);
  const [comment, setComment] = useState(_comment);

  return (
    <Box>
      <Flex>
        <Avatar
          name={comment?.authorData?.fullName}
          src={comment?.authorData?.pictureUrl}
        />

        <Center>
          <Box ms={2}>
            <Flex direction="column">
              <Box>
                <Link to={`/users/${comment?.commentData?.authorId}`}>
                  <Text
                    fontWeight="semibold"
                    color={useColorModeValue("blue.500", "blue.200")}
                  >
                    {comment?.authorData?.fullName}
                  </Text>
                </Link>
                <Text fontSize="xs" color="gray.500">
                  {formatDistanceToNow(
                    new Date(comment?.commentData?.datefield),
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
          {comment?.commentData?.comment}
        </Text>

        <Stack direction="row" spacing={2} mt={2} mb={3}>
          <IconButton size="sm" icon={<BiHeart />} isRound _focus={false} />
          <IconButton size="sm" icon={<BiReply />} isRound _focus={false} />

          {comment?.authorData?._id === currentAccount._id && (
            <IconButton
              colorScheme="red"
              size="sm"
              icon={<BiTrash />}
              isRound
              _focus={false}
            />
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default Comment;
