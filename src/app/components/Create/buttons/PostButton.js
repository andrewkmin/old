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
