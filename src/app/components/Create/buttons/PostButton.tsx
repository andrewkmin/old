import { Button, Center } from "@chakra-ui/react";

type PostButtonProps = {
  submitting: boolean;
  createPostDisabled: boolean;
};

// The button that will submit the form that will send a POST request to the back-end
const PostButton = ({
  // Button disabled state
  createPostDisabled,
  // Button submitting state
  submitting,
}: PostButtonProps) => {
  return (
    <Center>
      <Button
        size={"lg"}
        type={"submit"}
        rounded={"full"}
        fontWeight={"thin"}
        colorScheme={"blue"}
        isLoading={submitting}
        fontFamily={"ubuntu bold"}
        disabled={createPostDisabled}
      >
        Post
      </Button>
    </Center>
  );
};

export default PostButton;
