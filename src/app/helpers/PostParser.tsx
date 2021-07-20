import { NavLink } from "react-router-dom";
import { mention, url, hashtag } from "../utils/patterns";
import { Badge, chakra, Link, Tag, Text } from "@chakra-ui/react";

interface PostParserProps {
  body: string;
}

const PostParser = ({ body }: PostParserProps) => {
  return (
    <Text>
      {body.split(" ").map((value) => {
        if (url.test(value)) {
          return (
            <chakra.span>
              <Link rel={"noreferrer noopener"} href={value}></Link>
            </chakra.span>
          );
        } else if (mention.test(value)) {
          return (
            <chakra.span>
              <Badge>
                <Link as={NavLink} to={`/${value}`}>
                  {value}
                </Link>
              </Badge>
            </chakra.span>
          );
        } else if (hashtag.test(value)) {
          return (
            <chakra.span>
              <Tag>
                <Link as={NavLink} to={`/tags/${value}`}>
                  {value}
                </Link>
              </Tag>
            </chakra.span>
          );
        } else return value;
      })}
    </Text>
  );
};

export default PostParser;
