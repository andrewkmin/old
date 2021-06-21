import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { Hashtag, Mention, URL } from "../utils/patterns";
import { Tag, Text, Link as ChakraLink } from "@chakra-ui/react";

const Renderer = ({ text = "", fontSize = "md", ...props }) => {
  if (!text || text.length === 0) return;

  const rendered = text
    // Splitting the text
    .split(" ")
    // Mapping each splitted string
    .map((text) => {
      switch (text) {
        // HTTP URL
        case text.match(URL) !== null && text.match(URL)[0]: {
          return (
            <ChakraLink
              href={text}
              key={nanoid()}
              color={"blue.500"}
              target={"_blank"}
              rel={"noopener noreferrer"}
            >
              {text}
            </ChakraLink>
          );
        }
        // User mention
        case text.match(Mention) !== null && text.match(Mention)[0]: {
          return (
            <Tag size={fontSize} colorScheme={"blue"} key={nanoid()}>
              <Link to={`/users/${text.replace("@", "")}`} color={"gray.800"}>
                {text}
              </Link>
            </Tag>
          );
        }
        // Hashtag
        case text.match(Hashtag) !== null && text.match(Hashtag)[0]: {
          return (
            <Tag size={fontSize} colorScheme={"blue"} key={nanoid()}>
              <Link to={`/tags/${text.replace("#", "")}`} color={"gray.800"}>
                {text}
              </Link>
            </Tag>
          );
        }
        // Just text
        default: {
          return <span key={nanoid()}>{text}</span>;
        }
      }
    })
    .reduce((prev, current) => {
      return [prev, " ", current];
    });

  return (
    // Wrapping inside of a text to provide flexible styling
    <Text fontSize={fontSize} {...props}>
      {/* Wrapping rendered inside of a text tag to maintain font consistency */}
      {rendered}
    </Text>
  );
};

export default Renderer;
