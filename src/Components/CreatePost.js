import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  FormControl,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { BiImage } from "react-icons/bi";

import _axios from "../helpers/_axios";

const CreatePost = () => {
  const Toast = useToast();
  const AttachmentInputRef = useRef();
  const [createDisabled, setCreateDisabled] = useState(true);

  const handleInput = (event) => {
    if (event.target.value.length === 0) {
      setCreateDisabled(true);
    } else {
      setCreateDisabled(false);
    }
  };

  const handleCreatePost = async (event) => {
    event.preventDefault();

    const { data } = await _axios.put(
      "/api/posts/create",
      new FormData(event.target)
    );

    if (!data.error) {
      Toast({
        title: "Posted! 🤩",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <form
      encType="multipart/form-data"
      onSubmit={(event) => {
        handleCreatePost(event);
      }}
    >
      <Center m={2}>
        <Container
          boxShadow="md"
          border="1px"
          borderColor="gray.200"
          borderRadius="lg"
          p={3}
        >
          <Box m={2}>
            <Flex>
              <Center me={2}>
                <Avatar />
              </Center>

              <Center w="full">
                <FormControl>
                  <Input
                    onChange={(event) => handleInput(event)}
                    placeholder="Create post"
                    name="text"
                  />
                </FormControl>
              </Center>

              <Center ms={2}>
                <Button
                  colorScheme="teal"
                  disabled={createDisabled}
                  _focus={false}
                  _focusVisible={false}
                  _groupFocus={false}
                  isLoading={false}
                  type="submit"
                >
                  POST
                </Button>
              </Center>
            </Flex>
          </Box>

          <Divider />

          <Flex m={2}>
            <Button
              leftIcon={<BiImage />}
              _focus={false}
              _focusVisible={false}
              _focusWithin={false}
              w="full"
              me={1}
              onClick={() => {
                AttachmentInputRef.current.click();
              }}
            >
              Attach content
              <Input
                multiple
                ref={AttachmentInputRef}
                display="none"
                type="file"
                name="attachments"
              />
            </Button>
          </Flex>
        </Container>
      </Center>
    </form>
  );
};

export default CreatePost;
