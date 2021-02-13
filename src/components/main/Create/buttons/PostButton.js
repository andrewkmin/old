import { isMobile } from "react-device-detect";
import { Button, Center } from "@chakra-ui/react";

const PostButton = ({ createPostDisabled, submitting }) => {
  return (
    <Center>
      <Button
        size={isMobile ? "sm" : "lg"}
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
