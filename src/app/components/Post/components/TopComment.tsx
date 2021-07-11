import { AiFillFire } from "react-icons/ai";
import { Comment } from "../../../types/index";
import { formatDistanceToNow } from "date-fns";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
  Box,
  Stack,
  chakra,
  Avatar,
  Text,
  IconButton,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";

interface TopCommentProps {
  data: Comment;
}

const TopComment = ({ data: comment }: TopCommentProps) => {
  return (
    <Box
      p={2}
      m={[2, 3]}
      rounded={"md"}
      border={"2px"}
      borderColor={useColorModeValue("yellow.500", "yellow.600")}
      bgColor={useColorModeValue("yellow.50", "gray.700")}
    >
      <Stack>
        <Stack direction={"row"} alignItems={"center"}>
          <chakra.span>
            <AiFillFire color={"orange"} fontSize={"20px"} />
          </chakra.span>
          <chakra.span fontWeight={"semibold"}>Top comment</chakra.span>
        </Stack>
        <Stack p={2}>
          <Stack
            justifyContent={"space-between"}
            alignItems={"center"}
            direction={"row"}
          >
            <Stack alignItems={"center"} direction={"row"}>
              <Avatar size={"sm"} src={comment?.user?.avatar} />
              <Stack direction={"row"}>
                <Text fontSize={"sm"}>
                  <Link href={`/@${comment?.user?.username}`}>
                    <chakra.span fontWeight={"semibold"}>
                      {comment?.user?.first_name}
                    </chakra.span>
                  </Link>
                  {" • "}
                  {formatDistanceToNow(new Date(comment?.created_at), {
                    addSuffix: true,
                    includeSeconds: true,
                  })}
                </Text>
              </Stack>
            </Stack>

            <IconButton
              isRound
              size={"sm"}
              colorScheme={"pink"}
              icon={<AiOutlineHeart />}
              aria-label={"Post action"}
            />
          </Stack>
          <Text>{comment?.body}</Text>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TopComment;
