import { Box } from "@chakra-ui/react";
import Renderer from "../../../helpers/Renderer";

// Post content
const Content = ({ post }) => {
  return (
    // Middle section
    <Box>
      {/* Rendering post text */}
      <Renderer fontSize={["lg", "md"]} text={post?.text} />

      {/* Rendering post attachments if there are any */}
      {post?.attachments?.urls?.map((attachment, index) => {
        return (
          <object
            aria-label={attachment.url}
            data={attachment.url}
            key={index}
          ></object>
        );
      })}
    </Box>
  );
};

export default Content;
