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
          <Stack alignItems={"center"} spacing={1} direction={"row"}>
            <Input
              size={"lg"}
              type={"text"}
              name={"body"}
              rounded={"full"}
              placeholder={"Tell them what you think..."}
            />

            <Spacer />

            <Button
              size={"lg"}
              type={"submit"}
              rounded={"full"}
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
