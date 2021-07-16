import {
  Avatar as ChakraAvatar,
  Box,
  Button,
  Flex,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Section from "../Section";
import { useContext, useRef } from "react";
import DataContext from "../../data/data.context";
import { RiUploadCloud2Fill } from "react-icons/ri";

const Avatar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { userData } = useContext(DataContext);

  return (
    <Section title={"Avatar"}>
      <Stack direction={"row"} spacing={10}>
        <ChakraAvatar
          size={"xl"}
          src={userData?.avatar}
          name={userData?.username}
        />

        <Box w={"full"}>
          <Flex minH={"full"} alignItems={"center"}>
            <Stack minH={"full"} spacing={3}>
              <Stack direction={"row"}>
                <Input
                  type={"file"}
                  ref={inputRef}
                  name={"avatar"}
                  display={"none"}
                  accept={"image/*"}
                />
                <Button
                  w={"full"}
                  isDisabled
                  leftIcon={<RiUploadCloud2Fill />}
                  onClick={() => inputRef.current?.click()}
                >
                  Change avatar
                </Button>

                <Button isDisabled colorScheme={"red"} variant={"ghost"}>
                  Delete
                </Button>
              </Stack>
              <Text
                fontSize={"sm"}
                color={useColorModeValue("gray.500", "gray.300")}
              >
                .jpg, .gif, or .png. Max file size 700K.
              </Text>
            </Stack>
          </Flex>
        </Box>
      </Stack>
    </Section>
  );
};

export default Avatar;
