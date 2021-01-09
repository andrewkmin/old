import { Box, Flex, Avatar, Input, Button, Center } from "@chakra-ui/react";
import { Form, Formik } from "formik";

const CreatePost = () => {
  return (
    // TODO: Make this section wider, I guess
    <Formik>
      <Center>
        <Form>
          <Box
            p={2}
            border="1px"
            borderColor="gray.200"
            borderRadius="md"
            w="full"
          >
            <Flex>
              <Center p={3}>
                <Avatar />
                <Input
                  h="full"
                  w="full"
                  ms={2}
                  me={2}
                  type="text"
                  name="text"
                  // TODO: Add keyup event listener
                  placeholder="Create Post"
                />
                <Button
                  colorScheme="teal"
                  size="lg"
                  // TODO: Make the button enabled/disabled based on whether the text input is null or not
                >
                  POST
                </Button>
              </Center>
            </Flex>

            <Flex mt={2}>
              <Button w="full" m={1}>
                Photo
              </Button>
              <Button w="full" m={1}>
                Video
              </Button>
            </Flex>
          </Box>
        </Form>
      </Center>
    </Formik>
  );
};

export default CreatePost;
