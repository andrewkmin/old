import {
  Box,
  Container,
  Divider,
  Flex,
  useToast,
  useColorModeValue,
  Spacer,
} from "@chakra-ui/react";
import { useState } from "react";
import { isMobile } from "react-device-detect";

import _axios from "../../api/_axios";
import UserAvatar from "./ui/UserAvatar";
import TextInput from "./inputs/TextInput";
import PostButton from "./buttons/PostButton";
import AttachmentInput from "./inputs/AttachmentInput";

const CreateForm = () => {
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

    if (!data.error) {
      setSubmitting(false);
      setCreatePostDisabled(false);
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
      <Box m={2}>
        <Container
          boxShadow={"md"}
          p={isMobile ? 2 : 5}
          bg={useColorModeValue("white.500", "gray.700")}
          borderRadius={isMobile ? "md" : "lg"}
          borderColor={useColorModeValue("gray.300", "gray.800")}
        >
          <Box>
            <Flex>
              <Box>
                <UserAvatar />
              </Box>
              <Spacer />
              <Box w={"full"} mx={1}>
                <TextInput handleInput={handleInput} />
              </Box>
              <Spacer />
              <Box>
                <PostButton
                  submitting={submitting}
                  createPostDisabled={createPostDisabled}
                />
              </Box>
            </Flex>
          </Box>

          <Box>
            <Divider mt={3} mb={3} />
            <AttachmentInput />
          </Box>
        </Container>
      </Box>
    </form>
  );
};

export default CreateForm;
