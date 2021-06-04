import {
  Box,
  Divider,
  useToast,
  useColorModeValue,
  Stack,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";

import _axios from "../../api/axios";
import UserAvatar from "./ui/UserAvatar";
import TextInput from "./inputs/TextInput";
import PostButton from "./buttons/PostButton";
import AttachmentInput from "./inputs/AttachmentInput";

const CreateForm = () => {
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [createPostDisabled, setCreatePostDisabled] = useState(true);

  // For handling input and enabling/disabling the post button based on it
  const handleInput = (event) => {
    // Disabling the button if the length is 0
    if (event.target.value.length === 0) setCreatePostDisabled(true);
    else setCreatePostDisabled(false);
  };

  const handleCreatePost = async (event) => {
    // Preventing default behaviour
    event.preventDefault();

    // Loading
    setSubmitting(true);
    // Disabling create post button
    setCreatePostDisabled(true);

    // Sending a request
    const response = await _axios.put(
      "/api/posts/create",
      new FormData(event.target)
    );

    // Not loading
    setSubmitting(false);
    // Enabling create post button
    setCreatePostDisabled(false);

    // Checking the response
    switch (response.status) {
      // If post was created
      case 201: {
        return toast({
          title: "Post created!",
          status: "success",
          isClosable: false,
          duration: 2000,
        });
      }
      // If there was an error and the status wasn't 201
      default: {
        return toast({
          title: "There was an error",
          status: "error",
          isClosable: false,
          duration: 2000,
        });
      }
    }
  };

  return (
    <form
      autoComplete={"off"}
      encType={"multipart/form-data"}
      onSubmit={(event) => {
        handleCreatePost(event);
      }}
    >
      <Box>
        <Box
          p={[2, 3]}
          boxShadow={"md"}
          borderRadius={["md", "lg"]}
          bg={useColorModeValue("white.500", "gray.700")}
          borderColor={useColorModeValue("gray.300", "gray.800")}
        >
          <Stack>
            <Stack direction={"row"} spacing={2}>
              <Center>
                <UserAvatar />
              </Center>

              <Center w={"full"}>
                <TextInput handleInput={handleInput} />
              </Center>

              <Center>
                <PostButton
                  submitting={submitting}
                  createPostDisabled={createPostDisabled}
                />
              </Center>
            </Stack>

            <Divider />
            <AttachmentInput />
          </Stack>
        </Box>
      </Box>
    </form>
  );
};

export default CreateForm;
