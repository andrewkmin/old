import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { Stack, Button, Input, Box, Center } from "@chakra-ui/react";
import axios from "../../../api/axios";
import { useContext } from "react";
import PostContext from "../../../contexts/post.context";
import DataContext from "../../../data/data.context";

type Inputs = {
  body: string;
};

const CreateCommentForm = () => {
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { userData } = useContext(DataContext);
  const { post, setPost } = useContext(PostContext);

  const createComment = async (payload: Inputs) => {
    const { data, status } = await axios.post(
      `/api/comments/${post.id}/create`,
      payload
    );

    if (status === 200) {
      console.log({ data });
      setPost({
        ...post,
        comments: post.comments.concat([{ ...data, user: userData }]),
      });
    } else if (status === 400) {
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
