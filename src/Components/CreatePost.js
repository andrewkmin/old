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
  useColorModeValue,
} from "@chakra-ui/react";
import { IoMdImages } from "react-icons/io";
import { useState, useRef, useContext, useEffect } from "react";

import _axios from "../api/_axios";
import _DataContext from "../data/data.context";

const CreatePost = () => {
  const Toast = useToast();
  const AttachmentInputRef = useRef();
  const [userData, setUserData] = useState({});
  const DataContext = useContext(_DataContext);
  const [submitting, setSubmitting] = useState(false);
  const [createDisabled, setCreateDisabled] = useState(true);
  const [attachmentText, setAttachmentText] = useState("Photo/Video");

  const handleInput = (event) => {
    if (event.target.value.length === 0) {
      setCreateDisabled(true);
    } else {
      setCreateDisabled(false);
    }
  };

  const handleCreatePost = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setCreateDisabled(true);
    const { data } = await _axios.put(
      "/api/posts/create",
      new FormData(event.target)
    );

    if (!data.error) {
      // TODO: Maybe remove the toast
      Toast({
        title: "Posted! 🤩",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setSubmitting(false);
      setCreateDisabled(false);
    }
  };

  useEffect(() => {
    setUserData(DataContext.userData);
    return DataContext.userData;
  }, [DataContext.userData]);

  return (
    <form
      autoComplete="off"
      encType="multipart/form-data"
      onSubmit={(event) => {
        handleCreatePost(event);
      }}
    >
      <Center m={2}>
        <Container
          bg={useColorModeValue("white.500", "gray.700")}
          boxShadow="md"
          borderRadius="lg"
          p={3}
          border="1px"
          borderColor={useColorModeValue("gray.300", "gray.800")}
        >
          <Box m={2}>
            <Flex>
              <Center me={5}>
                <Avatar name={userData?.fullName} src={userData?.pictureUrl} />
              </Center>

              <Center w="full">
                <FormControl>
                  <Input
                    size="lg"
                    variant="flushed"
                    onChange={(event) => handleInput(event)}
                    placeholder="Write something..."
                    name="text"
                  />
                </FormControl>
              </Center>

              <Center ms={5}>
                <Button
                  size="lg"
                  colorScheme="blue"
                  disabled={createDisabled}
                  _focus={false}
                  isLoading={submitting}
                  type="submit"
                >
                  POST
                </Button>
              </Center>
            </Flex>
          </Box>

          <Box>
            <Divider mt={3} mb={3} />

            <Flex>
              <Button
                leftIcon={<IoMdImages color="green" />}
                _focus={false}
                _focusWithin={false}
                _focusVisible={false}
                variant="outline"
                w="full"
                me={1}
                onClick={() => {
                  AttachmentInputRef.current.click();
                }}
              >
                {attachmentText}
                <Input
                  onChange={(event) => {
                    if (event.target.files.length === 0) {
                      setAttachmentText("Photo/Video");
                    } else {
                      setAttachmentText(
                        `Attached ${event.target.files.length} files`
                      );
                    }
                  }}
                  multiple
                  accept="image/*, video/*"
                  ref={AttachmentInputRef}
                  display="none"
                  type="file"
                  name="attachments"
                />
              </Button>
            </Flex>
          </Box>
        </Container>
      </Center>
    </form>
  );
};

export default CreatePost;
