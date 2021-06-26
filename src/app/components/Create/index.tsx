import axios from "../../api/axios";
import Confetti from "react-confetti";
import TextInput from "./inputs/TextInput";
import PostButton from "./buttons/PostButton";
import DataContext from "../../data/data.context";
import AttachmentInput from "./inputs/AttachmentInput";
import { ChangeEvent, useContext, useState } from "react";
import {
  Box,
  Divider,
  useToast,
  Stack,
  Center,
  Button,
  Avatar,
  useColorModeValue,
  AvatarBadge,
} from "@chakra-ui/react";

const Create = () => {
  const toast = useToast();
  const { userData } = useContext(DataContext);
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
          onConfettiComplete={() => setSuccessful(false)}
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
            boxShadow={"lg"}
            borderRadius={"lg"}
            bgColor={useColorModeValue("#FFFFFC", "gray.700")}
            borderColor={useColorModeValue("gray.300", "gray.700")}
          >
            <Stack spacing={2}>
              <Stack direction={"row"}>
                <Center>
                  <Avatar
                    size={"md"}
                    boxShadow={"md"}
                    src={userData?.avatar}
                    name={userData?.firstName}
                  >
                    <AvatarBadge boxSize="1.15em" bg="green.500" />
                  </Avatar>
                </Center>

                <Center w={"full"}>
                  <TextInput handleInput={handleInput} />
                </Center>

                <PostButton
                  submitting={submitting}
                  createPostDisabled={createPostDisabled}
                />
              </Stack>

              <Divider />

              <Stack direction={"row"}>
                <AttachmentInput />
                <Button
                  w={"full"}
                  border={"2px"}
                  boxShadow={"xs"}
                  fontWeight={"sm"}
                  fontFamily={"ubuntu bold"}
                  variant={useColorModeValue("outline", "solid")}
                  borderColor={useColorModeValue("gray.300", "gray.800")}
                >
                  Something Else
                </Button>
                <Button
                  w={"full"}
                  border={"2px"}
                  fontWeight={"sm"}
                  fontFamily={"ubuntu bold"}
                  variant={useColorModeValue("outline", "solid")}
                  borderColor={useColorModeValue("gray.300", "gray.800")}
                >
                  Something Else
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default Create;
