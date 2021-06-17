import axios from "../../api/axios";
import Confetti from "react-confetti";
import UserAvatar from "./ui/UserAvatar";
import TextInput from "./inputs/TextInput";
import { ChangeEvent, useState } from "react";
import PostButton from "./buttons/PostButton";
import AttachmentInput from "./inputs/AttachmentInput";
import { Box, Divider, useToast, Stack, Center } from "@chakra-ui/react";

const CreateForm = () => {
  const toast = useToast();
  const [successful, setSuccessful] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [createPostDisabled, setCreatePostDisabled] = useState(true);

  // For handling input and enabling/disabling the post button based on it
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    // Disabling the button if the length is 0
    if (event.target.value.length === 0) setCreatePostDisabled(true);
    else setCreatePostDisabled(false);
  };

  // For creating a post
  const handleCreatePost = async (event: ChangeEvent<HTMLFormElement>) => {
    // Preventing default behaviour
    event.preventDefault();

    // Loading
    setSubmitting(true);
    // Disabling create post button
    setCreatePostDisabled(true);

    // Sending a request
    const response = await axios.post(
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
        setSuccessful(true);
        return toast({
          title: "Post created!",
          status: "success",
          isClosable: false,
          duration: 2000,
          onCloseComplete: () => setSuccessful(false),
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
    <>
      {successful && (
        <Confetti
          recycle={false}
          tweenDuration={100}
          numberOfPieces={1000}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      )}
      <form
        autoComplete={"off"}
        onSubmit={handleCreatePost}
        encType={"multipart/form-data"}
      >
        <Box>
          <Box
            p={[2, 3]}
            border={"2px"}
            bg={"white.500"}
            borderColor={"gray.100"}
            borderRadius={["md", "lg"]}
          >
            <Stack spacing={2}>
              <Stack direction={"row"}>
                <UserAvatar />

                <Center w={"full"}>
                  <TextInput handleInput={handleInput} />
                </Center>

                <PostButton
                  submitting={submitting}
                  createPostDisabled={createPostDisabled}
                />
              </Stack>

              <Divider />
              <AttachmentInput />
            </Stack>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default CreateForm;
