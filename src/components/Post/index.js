import {
  Link,
  Avatar,
  Box,
  Button,
  Center,
  ChakraProvider,
  extendTheme,
  Flex,
  Stack,
  Text,
  Spinner,
  Tag,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  List,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Spacer,
  ListItem,
  useColorMode,
  ColorModeScript,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState, useContext } from "react";
import { isMobile } from "react-device-detect";
import { BiCommentDetail } from "react-icons/bi";
import { BsHeartFill } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiMoreHorizontal, FiShare } from "react-icons/fi";

import DataContext from "../../data/data.context";

const Post = ({ data: post }) => {
  const { userData } = useContext(DataContext);
  const [states, setState] = useState({
    fetchingReactions: false,
    hearted: false,
    saved: false,
  });

  return (
    <Box
      border={"2px"}
      borderColor={useColorModeValue("gray.200", "gray.700")}
      borderRadius={"lg"}
      m={5}
      p={4}
      bgColor={useColorModeValue("white", "gray.700")}
    >
      <Stack direction={"column"} spacing={5}>
        <Top data={post} />
        <Box>
          <Text fontWeight={"semibold"} fontSize={isMobile ? "sm" : "md"}>
            Hello everyone! Today me and{" "}
            <Link>
              <Tag size={isMobile ? "sm" : "md"} colorScheme={"blue"}>
                @jake_doe
              </Tag>
            </Link>{" "}
            have finally launched{" "}
            <Link>
              <Tag size={isMobile ? "sm" : "md"} colorScheme={"teal"}>
                #usocial
              </Tag>
            </Link>
            !
          </Text>
        </Box>

        <Box>
          <Flex direction={"row"}>
            <Center>
              <BsHeartFill color={"red"} />
              <Box>
                <Center>
                  <Popover
                    size={"md"}
                    trigger={"hover"}
                    onOpen={() => {
                      setState({ fetchingReactions: true });
                    }}
                  >
                    <PopoverTrigger>
                      <Text ms={1} fontSize={"sm"} fontWeight={"semibold"}>
                        {post?.postData?.hearts.length} people hearted
                      </Text>
                    </PopoverTrigger>
                    <PopoverContent mx={2}>
                      <PopoverArrow />
                      <PopoverBody>
                        <Box>{/* TODO */}</Box>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Center>
              </Box>
            </Center>
          </Flex>
        </Box>
        <Box>
          <Stack direction={isMobile ? "column" : "row"}>
            <Button
              leftIcon={
                states.hearted ? (
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                  >
                    <FaHeart />
                  </motion.div>
                ) : (
                  <FaRegHeart />
                )
              }
              colorScheme={states.hearted ? "red" : "gray"}
              onClick={() => (states.hearted ? /* Unheart post */ : /* Heart post */)}
              w={"full"}
              size={isMobile ? "sm" : "md"}
            >
              {hearted ? "Hearted" : "Heart"}
            </Button>
            <Button
              leftIcon={<BiCommentDetail />}
              colorScheme={"gray"}
              w={"full"}
              onClick={() => {
                setShowComments(true);
              }}
            >
              Comment
            </Button>
            <Button leftIcon={<FiShare />} colorScheme={"gray"} w={"full"}>
              Share
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Post;
