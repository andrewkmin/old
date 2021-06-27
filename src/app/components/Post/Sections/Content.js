import Media from "../../Media";
import Carousel from "../../Carousel";
import { Box } from "@chakra-ui/react";
import Renderer from "../../../helpers/Renderer";

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
            <Box p={2}>
              <Media
                rounded={"xl"}
                key={attachment.url}
                url={attachment.url}
                mimetype={attachment.mimetype}
              />
            </Box>
          );
        })}
      </Carousel>
    </Box>
  );
};

export default Content;
