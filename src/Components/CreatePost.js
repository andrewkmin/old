import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const CreatePost = () => {
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

  return (
    <>
      <Center>
        <Container border="1px" borderColor="gray.200" borderRadius="lg" p={3}>
          <Box m={2}>
            <Flex>
              <Center me={2}>
                <Avatar />
              </Center>

              <Center w="full">
                <FormControl>
                  <Input placeholder="Create post" />
                  <FormErrorMessage></FormErrorMessage>
                </FormControl>
              </Center>

              <Center ms={2}>
                <Button
                  colorScheme="teal"
                  disabled
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
