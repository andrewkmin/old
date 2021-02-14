import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { Tag, Text, Link as ChakraLink } from "@chakra-ui/react";

/**
 * Usage:
 * ```js
 * <PostRenderer input="Hey guys I love color #red. Thanks @someUser for sharing" />
 * ```
 * @arugments {String} input, fontSize
 * @author Michael Grigoryan
 */

const Renderer = ({
  text, // The input that will get parsed
  fontSize = "md", // This props will also be set on all the tags to maintain consistency
  ...props // Rest of the props
}) => {
  // For detecting links
  const linkRegex = new RegExp(/(https?:\/\/[^\s]+)/g);
  // For detecting hashtags
  const hashtagRegex = new RegExp(/\B(#[a-zA-Z]+\b)(?!;)/);
  // For detecting user mentions
  const userMentionRegex = new RegExp(/^(?!.*\bRT\b)(?:.+\s)?@\w+/i);

  const RenderedPost = text
    // Splitting the text
    .split(" ")
    // Mapping each splitted string
    .map((text) => {
      switch (text) {
        // If a link was detected and the detected array is not equal to null
        case text.match(linkRegex) !== null && text.match(linkRegex)[0]: {
          text = (
            <ChakraLink href={text} target={"_blank"} key={nanoid()}>
              {text}
            </ChakraLink>
          );
          return text;
        }
        // If a user mention was detected and the detected array is not equal to null
        case text.match(userMentionRegex) !== null &&
          text.match(userMentionRegex)[0]: {
          text = (
            <Tag size={fontSize} colorScheme={"blue"} key={nanoid()}>
              <Link color={"gray.800"}>{text}</Link>
            </Tag>
          );
          return text;
        }
        // If a hashtag was detected and the detected array is not equal to null
        case text.match(hashtagRegex) !== null && text.match(hashtagRegex)[0]: {
          text = (
            <Tag size={fontSize} colorScheme={"blue"} key={nanoid()}>
              <Link to={`/tags/${text.replace("#", "")}`} color={"gray.800"}>
                {text}
              </Link>
            </Tag>
          );
          return text;
        }
        default: {
          // If it is a basic text
          return <span key={nanoid()}>{text}</span>;
        }
      }
    })
    .reduce((prev, current) => [prev, " ", current]);

  return (
    // Wrapping inside of a text to provide flexible styling
    <Text fontSize={fontSize} {...props}>
      {/* Wrapping the RenderedPost inside of a text tag to maintain consistency */}
      {RenderedPost}
    </Text>
  );
};

export default Renderer;
