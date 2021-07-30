import {
  Box,
  Text,
  Flex,
  Icon,
  Stack,
  chakra,
  Avatar,
  useColorModeValue,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { useContext, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import PostContext from "../../../contexts/post.context";
import { CommentProps, Comment as CommentType } from "../../../types";
import axios from "../../../api/axios";
import DataContext from "../../../data/data.context";

const Comment = ({ data }: CommentProps) => {
  const { userData } = useContext(DataContext);
  const { setPost, post } = useContext(PostContext);
  const toast = useToast({ position: "bottom-left" });
  const [comment, setState] = useState<CommentType>({ ...data });

  const deleteComment = async () => {
    const { status } = await axios.delete(
      `/api/comments/${post.id}/${comment.id}/remove`
    );

    if (status === 204) {
      toast({
        title: "Comment deleted",
        status: "success",
      });

      setPost({
        ...post,
        comments: post?.comments?.filter(
          (comment: any) => comment.id !== data.id
        ),
      });
    } else {
      return toast({
        title: "There was an error",
        status: "error",
      });
    }
  };

  return (
    <Box
      p={2}
      m={[2, 3]}
      rounded={"md"}
      border={"2px"}
      bgColor={useColorModeValue("gray.50", "gray.600")}
      borderColor={useColorModeValue("gray.300", "gray.400")}
    >
      <Stack p={2}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack alignItems={"center"} direction={"row"}>
            <Avatar
              size={"sm"}
              src={comment?.user?.avatar}
              name={comment?.user?.username}
            />
            <Stack
              w={"full"}
              direction={"row"}
              justifyContent={"space-between"}
            >
              <Text fontSize={"sm"}>
                <chakra.span fontWeight={"semibold"}>
                  {comment?.user?.first_name}
                </chakra.span>

                {" • "}

                <chakra.span fontWeight={"semibold"}>
                  {comment?.created_at &&
                    formatDistanceToNow(new Date(comment?.created_at), {
                      addSuffix: true,
                      includeSeconds: true,
                    })}
                </chakra.span>
              </Text>
            </Stack>
          </Stack>

          {comment?.user?.id === userData?.id && (
            <IconButton
              isRound
              colorScheme={"red"}
              aria-label={"Delete post"}
              onClick={() => deleteComment()}
              icon={<Icon as={FaTrash} />}
            />
          )}
        </Stack>

        <Text>{comment?.body}</Text>
      </Stack>
    </Box>
  );
};

export default Comment;
