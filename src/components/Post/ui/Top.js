import {
  Avatar,
  Box,
  Center,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMoreHorizontal } from "react-icons/fi";
import { formatDistanceToNowStrict } from "date-fns";

import DataContext from "../../../data/data.context";
import { SavePost, DeletePost, UnsavePost } from "../../../api/functions";

const Top = ({ data: post }) => {
  const { userData } = useContext(DataContext);
  const [states, setState] = useState({});

  useEffect(() => {}, []);

  return (
    <Flex direction={"row"}>
      <Avatar
        name={post?.authorData?.fullName}
        src={post?.authorData?.pictureUrl}
      />
      <Center>
        <Flex ms={1} direction={"column"}>
          <Link to={`/users/${post?.authorData?._id}`}>
            <Text fontWeight={"bold"}>Michael Grigoryan</Text>
          </Link>
          <Text fontSize={"xs"}>
            {post?.postData?.datefield &&
              formatDistanceToNowStrict(post?.postData?.datefield)}
          </Text>
        </Flex>
      </Center>
      <Spacer />
      <Box>
        <Menu>
          <MenuButton as={IconButton} isRound icon={<FiMoreHorizontal />} />
          <MenuList>
            <MenuItem
              onClick={() => {
                states.saved ? UnsavePost(post) : SavePost(post);
              }}
            >
              {states.saved ? "Unsave" : "Save"}
            </MenuItem>
            {post.authorData._id === userData._id && (
              <>
                <MenuItem onClick={() => DeletePost(post)}>Delete</MenuItem>
              </>
            )}
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Top;
