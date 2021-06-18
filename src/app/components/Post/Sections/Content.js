import Carousel from "../../Carousel";
import { Box } from "@chakra-ui/react";
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
            <Media
              url={attachment.url}
              mimetype={attachment.mimetype}
              key={attachment.url}
            />
            // <object
            //   aria-controls={"enabled"}
            //   style={{
            //     width: "100%",
            //     height: "50%",
            //   }}
            //   aria-label={attachment.url}
            //   data={`http://${attachment.url}`}
            //   key={index}
            // ></object>
          );
        })}
      </Carousel>
    </Box>
  );
};

export default Content;
