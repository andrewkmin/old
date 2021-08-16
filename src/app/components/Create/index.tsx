import {
  Box,
  useToast,
  Stack,
  Center,
  Avatar,
  useColorModeValue,
  AvatarBadge,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import { Post } from "../../types";
import axios from "../../api/axios";
import DataContext from "../../data/data.context";
import { ChangeEvent, useContext, useState } from "react";
import PostListContext from "../../contexts/post.list.context";

const Create = () => {
  const { userData } = useContext(DataContext);
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast({ position: "bottom-left" });
  const [createPostDisabled, setCreatePostDisabled] = useState(true);
  const { setData: setAllPosts, data: allPosts } = useContext(PostListContext);

  // For handling input and enabling/disabling the post button based on it
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    // Disabling the button if the length is 0
    if (event.target.value.length === 0) setCreatePostDisabled(true);
    else setCreatePostDisabled(false);
  };

  // For creating a post
  const handleCreatePost = async (event: ChangeEvent<HTMLFormElement>) => {
    // Preventing default behavior
    event.preventDefault();

    // Closing all toasts
    toast.closeAll();

    // Loading
    setSubmitting(true);
    // Disabling create post button
    setCreatePostDisabled(true);

    // Sending a request
    const { data: response, status } = await axios.post<Post>(
      "/api/posts/create",
      {
        body: event.target.body.value,
      }
    );

    // Not loading
    setSubmitting(false);
    // Enabling create post button
    setCreatePostDisabled(false);

    // If there's an error
    if (status !== 200) {
      return toast({
        title: "There was an error",
        status: "error",
      });
    } else {
      toast({
        title: "Post created",
        status: "success",
      });
      // Updating the post list
      setAllPosts([response as any].concat(allPosts as any));
      event.target.body.value = "";
      return setCreatePostDisabled(true);
    }
  };

  return (
    <form autoComplete={"off"} onSubmit={handleCreatePost}>
      <Box>
        <Box
          p={[2, 3]}
          borderRadius={"xl"}
          bgColor={useColorModeValue("#FFFFFC", "gray.700")}
        >
          <Stack spacing={2}>
            <Stack direction={"row"}>
              {/* Avatar view */}
              <Center>
                <Avatar
                  rounded={"xl"}
                  src={userData?.avatar}
                  name={userData?.username}
                >
                  <AvatarBadge boxSize={"1.15em"} bg={"green.500"} />
                </Avatar>
              </Center>

              <Center w={"full"}>
                <FormControl>
                  <Center>
                    <Input
                      size={"lg"}
                      name={"body"}
                      rounded={"xl"}
                      boxShadow={"sm"}
                      variant={"filled"}
                      onChange={handleInput}
                      placeholder={"Got any ideas to share?"}
                    />
                  </Center>
                </FormControl>
              </Center>

              <Center>
                <Button
                  size={"lg"}
                  type={"submit"}
                  rounded={"xl"}
                  fontWeight={"thin"}
                  colorScheme={"purple"}
                  isLoading={submitting}
                  fontFamily={"ubuntu bold"}
                  disabled={createPostDisabled}
                  bgColor={useColorModeValue("purple.400", "purple.300")}
                >
                  Post
                </Button>
              </Center>
            </Stack>

            {/* <Divider />

            <Stack direction={"row"}>
              <AttachmentInput />
              <Button
                w={"full"}
                size={"lg"}
                rounded={"xl"}
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
                rounded={"xl"}
                border={"2px"}
                boxShadow={"xs"}
                fontWeight={"sm"}
                fontFamily={"ubuntu bold"}
                variant={useColorModeValue("outline", "solid")}
                borderColor={useColorModeValue("gray.200", "gray.800")}
              >
                <Text fontSize={["sm", "md"]}>Something</Text>
              </Button>
            </Stack> */}
          </Stack>
        </Box>
      </Box>
    </form>
  );
};

export default Create;
