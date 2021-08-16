import { useContext } from "react";
import axios from "../../../api/axios";
import { useForm } from "react-hook-form";
import DataContext from "../../../data/data.context";
import PostContext from "../../../contexts/post.context";
import { Stack, Button, Input, Box, Center, useToast } from "@chakra-ui/react";

type Inputs = {
  body: string;
};

const CreateCommentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { userData } = useContext(DataContext);
  const { post, setPost } = useContext(PostContext);
  const toast = useToast({ position: "bottom-left" });

  const createComment = async (payload: Inputs) => {
    const { data, status } = await axios.post(
      `/api/comments/${post.id}/create`,
      payload
    );

    if (status === 200) {
      return setPost({
        ...post,
        comments: post.comments.concat([{ ...data, user: userData }]),
      });
    } else {
      return toast({
        title:
          status === 400 ? "There are invalid fields" : "There was an error",
        status: "error",
      });
    }
  };

  return (
    <Box>
      <Center>
        <form onSubmit={handleSubmit(createComment)}>
          <Stack spacing={3} alignItems={"center"} direction={"row"}>
            <Input
              size={"lg"}
              type={"text"}
              rounded={"xl"}
              placeholder={"Tell them what you think..."}
              {...register("body", { required: true, minLength: 5 })}
            />

            <Button
              size={"lg"}
              rounded={"xl"}
              type={"submit"}
              colorScheme={"purple"}
              bgColor={"purple.400"}
            >
              Comment
            </Button>
          </Stack>
        </form>
      </Center>
    </Box>
  );
};

export default CreateCommentForm;
