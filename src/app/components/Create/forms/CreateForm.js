import {
  Avatar,
  Box,
  Center,
  Container,
  Divider,
  Flex,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState, useContext } from "react";

import _axios from "../api/_axios";
import PostButton from "../buttons/PostButton";
import _DataContext from "../data/data.context";
import AttachmentInput from "../inputs/AttachmentInput";
import TextInput from "../inputs/TextInput";

const CreateForm = () => {
  const Toast = useToast();
  const { userData } = useContext(_DataContext);
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
      <Center m={2}>
        <Container
          bg={useColorModeValue("white.500", "gray.700")}
          boxShadow={"md"}
          borderRadius={"lg"}
          p={3}
          border={"1px"}
          borderColor={useColorModeValue("gray.300", "gray.800")}
        >
          <Box m={2}>
            <Flex>
              <Center me={5}>
                <Avatar
                  name={`${userData?.firstName} ${userData?.lastName}`}
                  src={userData?.avatar}
                />
              </Center>

              <Center w={"full"}>
                <TextInput handleInput={handleInput} />
              </Center>

              <Center ms={5}>
                <PostButton
                  submitting={submitting}
                  createPostDisabled={createPostDisabled}
                />
              </Center>
            </Flex>
          </Box>

          <Box>
            <Divider mt={3} mb={3} />
            <AttachmentInput />
          </Box>
        </Container>
      </Center>
    </form>
  );
};

export default CreateForm;
