import { Comment as CommentType } from "../../../types";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Stack, Button, Input, Box, Center, Spacer } from "@chakra-ui/react";

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
          <Stack alignItems={"center"} direction={"row"}>
            <Input
              type={"text"}
              name={"body"}
              placeholder={"Tell them what you think..."}
            />

            <Spacer />

            <Button
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
