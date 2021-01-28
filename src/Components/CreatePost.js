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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiImage, BiVideo } from "react-icons/bi";

import _axios from "../helpers/_axios";

const CreatePost = () => {
  const Toast = useToast();
  const {
    isOpen: imageUploadIsOpen,
    onOpen: imageUploadOnOpen,
    onClose: imageUploadOnClose,
  } = useDisclosure();

  const {
    isOpen: videoUploadIsOpen,
    onOpen: videoUploadOnOpen,
    onClose: videoUploadOnClose,
  } = useDisclosure();

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
      new FormData(event.currentTarget)
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
    <>
      <Center m={2}>
        <Container
          boxShadow="md"
          border="1px"
          borderColor="gray.200"
          borderRadius="lg"
          p={3}
        >
          <Box m={2}>
            <form
              encType="multipart/form-data"
              onSubmit={(event) => {
                handleCreatePost(event);
              }}
            >
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
            </form>
          </Box>

          <Divider />

          <Flex m={2}>
            <Button
              leftIcon={<BiImage />}
              _focus={false}
              _focusVisible={false}
              _focusWithin={false}
              onClick={imageUploadOnOpen}
              w="full"
              me={1}
            >
              Image
            </Button>
            <Button
              leftIcon={<BiVideo />}
              _focus={false}
              _focusVisible={false}
              _focusWithin={false}
              w="full"
              ms={1}
              onClick={videoUploadOnOpen}
            >
              Video
            </Button>
          </Flex>
        </Container>
      </Center>

      <Modal onClose={imageUploadOnClose} isOpen={imageUploadIsOpen} isCentered>
        <ModalOverlay />
        <ModalContent m={2}>
          <ModalHeader>Upload Images</ModalHeader>
          <ModalCloseButton
            _focus={false}
            _focusVisible={false}
            _focusWithin={false}
          />
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button
              _focus={false}
              _focusVisible={false}
              _focusWithin={false}
              onClick={imageUploadOnClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal onClose={videoUploadOnClose} isOpen={videoUploadIsOpen} isCentered>
        <ModalOverlay />
        <ModalContent m={2}>
          <ModalHeader>Upload Videos</ModalHeader>
          <ModalCloseButton
            _focus={false}
            _focusVisible={false}
            _focusWithin={false}
          />
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button
              _focus={false}
              _focusVisible={false}
              _focusWithin={false}
              onClick={videoUploadOnClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
