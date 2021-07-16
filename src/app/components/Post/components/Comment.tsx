import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
// import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { CommentProps, Comment as CommentType } from "../../../types";
import {
  Box,
  Stack,
  chakra,
  Avatar,
  Text,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";

const Comment = ({ data }: CommentProps) => {
  const [comment, setState] = useState<CommentType>();

  useEffect(() => {
    setState(data);
  }, [data]);

  return (
    <Box
      p={2}
      m={[2, 3]}
      rounded={"md"}
      border={"2px"}
      bgColor={useColorModeValue("gray.50", "gray.600")}
      borderColor={useColorModeValue("gray.300", "gray.400")}
    >
      <Stack
        justifyContent={"space-between"}
        alignItems={"center"}
        direction={"row"}
        w={"full"}
        p={2}
      >
        <Box>
          <Stack
            justifyContent={"space-between"}
            alignItems={"center"}
            direction={"row"}
          >
            <Stack alignItems={"center"} direction={"row"}>
              <Avatar
                size={"sm"}
                src={comment?.user?.avatar}
                name={comment?.user?.username}
              />
              <Stack direction={"row"}>
                <Text fontSize={"sm"}>
                  <chakra.span fontWeight={"semibold"}>
                    {comment?.user?.first_name}
                  </chakra.span>
                  {" • "}
                  {comment?.created_at &&
                    formatDistanceToNow(new Date(comment?.created_at), {
                      addSuffix: true,
                      includeSeconds: true,
                    })}
                </Text>
              </Stack>
            </Stack>
          </Stack>
          <Text>{comment?.body}</Text>
        </Box>

        <IconButton
          isRound
          size={"sm"}
          colorScheme={"pink"}
          aria-label={"Post action"}
        />
      </Stack>
    </Box>
  );
};

export default Comment;
