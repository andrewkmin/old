import { Comment as CommentType } from "../../../types";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Stack, Button, Input, Box, Center } from "@chakra-ui/react";

interface CreateCommentFormProps {
  setComments: Dispatch<SetStateAction<CommentType[] | undefined>>;
}

const CreateCommentForm = ({ setComments }: CreateCommentFormProps) => {
  const createComment = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Box>
      <Center>
        <form onSubmit={createComment}>
          <Stack spacing={3} alignItems={"center"} direction={"row"}>
            <Input
              size={"lg"}
              type={"text"}
              name={"body"}
              rounded={"xl"}
              placeholder={"Tell them what you think..."}
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
