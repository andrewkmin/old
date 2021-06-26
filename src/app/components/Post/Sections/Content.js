import Carousel from "../../Carousel";
import { Box, Center } from "@chakra-ui/react";
import Renderer from "../../../helpers/Renderer";
import Media from "../../Media";

// Post content
const Content = ({ post }) => {
  return (
    // Middle section
    <Box>
      {/* Rendering post text */}
      <Renderer fontSize={["lg", "md"]} text={post.body} />

      <Carousel>
        {/* Rendering post attachments if there are any */}
        {post?.attachments?.urls?.map((attachment, index) => {
          return (
            // <Center>
            <Media
              m={5}
              rounded={"xl"}
              key={attachment.url}
              url={attachment.url}
              mimetype={attachment.mimetype}
            />
            // </Center>
          );
        })}
      </Carousel>
    </Box>
  );
};

export default Content;
