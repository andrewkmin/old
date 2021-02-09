// import Linkify from "react-linkify";
import { Link } from "react-router-dom";
import { FaHashtag } from "react-icons/fa";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";

/**
 * Usage:
 * ```js
 * <PostRenderer input="Hey guys I love color #red. Thanks @someUser for sharing" />
 * ```
 * @arugments {String} input
 * @author Michael Grigoryan
 */

const PostRenderer = ({ input }) => {
  const RenderedPost = input
    .split(" ")
    .map((text) => {
      return text.startsWith("#", 0) ? (
        <Tag
          ms={1}
          me={1}
          mt={0.2}
          mb={0.2}
          as={Link}
          to={`/hashtags/${text.toLowerCase().replace("#", "")}`}
          size="md"
          key={input.indexOf(text)}
          variant="solid"
          colorScheme="teal"
        >
          <TagLeftIcon boxSize="12px" as={FaHashtag} />
          <TagLabel>{text.replace("#", "")}</TagLabel>
        </Tag>
      ) : (
        <span key={input.indexOf(text)}>{text}</span>
      );
    })
    .reduce((prev, curr) => [prev, " ", curr]);
  return RenderedPost;
};

export default PostRenderer;
