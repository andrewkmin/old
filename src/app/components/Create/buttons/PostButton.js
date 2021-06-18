import { Button, Center } from "@chakra-ui/react";

// The button that will submit the form that will send a POST request to the back-end
const PostButton = ({
  // Button disabled state
  createPostDisabled,
  // Button submitting state
  submitting,
}) => {
  return (
    <Center>
      <Button
        size={"md"}
        type={"submit"}
        colorScheme={"blue"}
        isLoading={submitting}
        disabled={createPostDisabled}
      >
        POST
      </Button>
    </Center>
  );
};

export default PostButton;
