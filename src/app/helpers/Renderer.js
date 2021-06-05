import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { Tag, Text, Link as ChakraLink } from "@chakra-ui/react";

import { Hashtag, Mention, URL } from "../utils/patterns";

const Renderer = ({ text = "", fontSize = "md", ...props }) => {
  const Rendered = text
    // Splitting the text
    .split(" ")
    // Mapping each splitted string
    .map((text) => {
      switch (text) {
        // HTTP URL
        case text.match(URL) !== null && text.match(URL)[0]: {
          text = (
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
          return text;
        }
        // User mention
        case text.match(Mention) !== null && text.match(Mention)[0]: {
          text = (
            <Tag size={fontSize} colorScheme={"blue"} key={nanoid()}>
              <Link to={`/users/${text.replace("@", "")}`} color={"gray.800"}>
                {text}
              </Link>
            </Tag>
          );
          return text;
        }
        // Hashtag
        case text.match(Hashtag) !== null && text.match(Hashtag)[0]: {
          text = (
            <Tag size={fontSize} colorScheme={"blue"} key={nanoid()}>
              <Link to={`/tags/${text.replace("#", "")}`} color={"gray.800"}>
                {text}
              </Link>
            </Tag>
          );
          return text;
        }
        // Just text
        default: {
          return <span key={nanoid()}>{text}</span>;
        }
      }
    })
    .reduce((prev, current) => [prev, " ", current]);

  return (
    // Wrapping inside of a text to provide flexible styling
    <Text fontSize={fontSize} {...props}>
      {/* Wrapping the RenderedPost inside of a text tag to maintain consistency */}
      {Rendered}
    </Text>
  );
};

export default Renderer;