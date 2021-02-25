import { Button, Center } from "@chakra-ui/react";

const PostButton = ({ createPostDisabled, submitting }) => {
  return (
    <Center>
      <Button
        borderRadius={"xl"}
        size={"md"}
        colorScheme={"blue"}
        disabled={createPostDisabled}
        isLoading={submitting}
        type={"submit"}
      >
        POST
      </Button>
    </Center>
  );
};

export default PostButton;
