import {
  Box,
  Text,
  Icon,
  Stack,
  chakra,
  Avatar,
  useColorModeValue,
  IconButton,
  useToast,
  Tooltip,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/react";
import axios from "../../../api/axios";
import { FaTrash } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { useContext, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import DataContext from "../../../data/data.context";
import PostContext from "../../../contexts/post.context";
import { CommentProps, Comment as CommentType } from "../../../types";
import { IoMdClose } from "react-icons/io";

const Comment = ({ data }: CommentProps) => {
  const { userData } = useContext(DataContext);
  const { setPost, post } = useContext(PostContext);
  const [isEditing, setIsEditing] = useState(false);
  const toast = useToast({ position: "bottom-left" });
  const [comment] = useState<CommentType>({ ...data });

  // A function for deleting a comment
  const deleteComment = async () => {
    // Sending the request
    const { status } = await axios.delete(
      `/api/comments/${post.id}/${comment.id}/remove`
    );

    // Everything's fine
    if (status === 204) {
      // Updating post's comments
      setPost({
        ...post,
        comments: post?.comments?.filter(
          (comment: any) => comment.id !== data.id
        ),
      });

      // Notifying the user
      return toast({
        title: "Comment deleted",
        status: "success",
      });
    }
    // On error
    else {
      return toast({
        title: "There was an error",
        status: "error",
      });
    }
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  console.log({ isEditing });

  return (
    <Box
      p={2}
      m={[2, 3]}
      rounded={"md"}
      border={"2px"}
      bgColor={useColorModeValue("gray.50", "gray.800")}
      borderColor={useColorModeValue("gray.300", "gray.600")}
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

                <chakra.span fontWeight={"light"}>
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
            <Box>
              <Stack direction={"row"}>
                <Tooltip
                  placement={"bottom-start"}
                  label={isEditing ? "Quit edit mode" : "Edit comment"}
                >
                  <IconButton
                    isRound
                    size={"sm"}
                    aria-label={"Delete post"}
                    onClick={() => toggleEdit()}
                    colorScheme={isEditing ? "red" : "blue"}
                    icon={
                      isEditing ? (
                        <Icon as={IoMdClose} />
                      ) : (
                        <Icon as={AiFillEdit} />
                      )
                    }
                  />
                </Tooltip>

                <Tooltip placement={"bottom-start"} label={"Delete comment"}>
                  <IconButton
                    isRound
                    size={"sm"}
                    colorScheme={"red"}
                    aria-label={"Delete post"}
                    icon={<Icon as={FaTrash} />}
                    onClick={() => deleteComment()}
                  />
                </Tooltip>
              </Stack>
            </Box>
          )}
        </Stack>

        {isEditing ? (
          <Box>
            <Editable
              defaultValue={comment?.body}
              isDisabled={comment?.user?.id !== userData?.id}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
          </Box>
        ) : (
          <Text>{comment?.body}</Text>
        )}
      </Stack>
    </Box>
  );
};

export default Comment;
