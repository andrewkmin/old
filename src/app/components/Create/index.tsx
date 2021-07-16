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
  Text,
} from "@chakra-ui/react";
import { Post } from "../../types";
import axios from "../../api/axios";
import TextInput from "./inputs/TextInput";
import PostButton from "./buttons/PostButton";
import DataContext from "../../data/data.context";
import AttachmentInput from "./inputs/AttachmentInput";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface CreateProps {
  posts?: Post[];
  setPosts?: Dispatch<SetStateAction<Post[]>>;
}

const Create = ({ posts, setPosts }: CreateProps) => {
  const toast = useToast();
  const { userData } = useContext(DataContext);
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
    const response = await axios.post<Post>(
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
      case 200: {
        // Pushing to external posts holder array
        if (posts && setPosts) setPosts!!(posts.concat([response.data]));

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
    <form
      autoComplete={"off"}
      onSubmit={handleCreatePost}
      encType={"multipart/form-data"}
    >
      <Box px={4} py={2} w={["sm", "md", "lg", "xl"]} m={4}>
        <Box
          p={[2, 3]}
          border={"2px"}
          boxShadow={"md"}
          borderRadius={"xl"}
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
                  name={userData?.first_name}
                >
                  <AvatarBadge boxSize={"1.15em"} bg={"green.500"} />
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
                size={"lg"}
                border={"2px"}
                boxShadow={"xs"}
                fontWeight={"sm"}
                fontFamily={"ubuntu bold"}
                variant={useColorModeValue("outline", "solid")}
                borderColor={useColorModeValue("gray.200", "gray.800")}
              >
                <Text fontSize={["sm", "md"]}>Something</Text>
              </Button>
              <Button
                w={"full"}
                size={"lg"}
                border={"2px"}
                fontWeight={"sm"}
                fontFamily={"ubuntu bold"}
                variant={useColorModeValue("outline", "solid")}
                borderColor={useColorModeValue("gray.200", "gray.800")}
              >
                <Text fontSize={["sm", "md"]}>Something</Text>
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </form>
  );
};

export default Create;
