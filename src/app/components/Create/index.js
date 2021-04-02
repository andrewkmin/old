import {
  Box,
  Divider,
  useToast,
  useColorModeValue,
  Stack,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";

import _axios from "../../api/_axios";
import UserAvatar from "./ui/UserAvatar";
import TextInput from "./inputs/TextInput";
import PostButton from "./buttons/PostButton";
import AttachmentInput from "./inputs/AttachmentInput";

const CreateForm = ({ _posts, _setPosts }) => {
  const Toast = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [createPostDisabled, setCreatePostDisabled] = useState(true);

  const handleInput = (event) => {
    if (event.target.value.length === 0) {
      setCreatePostDisabled(true);
    } else {
      setCreatePostDisabled(false);
    }
  };

  const handleCreatePost = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setCreatePostDisabled(true);
    const { data } = await _axios.put(
      "/api/posts/create",
      new FormData(event.target)
    );

    if (!data?.error) {
      setSubmitting(false);
      setCreatePostDisabled(false);

      if (_setPosts && _posts) {
        console.log({ data });
        _setPosts((_posts) => _posts.concat([data]));
      } else {
        Toast({
          title: "Post created!",
          status: "success",
          isClosable: false,
          duration: 2000,
        });
      }
    } else {
      Toast({
        title: "There was an error",
        status: "error",
        isClosable: false,
        duration: 2000,
      });
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
