import { Box } from "@chakra-ui/react";
import Renderer from "../../../helpers/Renderer";

// Post content
const Content = ({ post }) => {
  return (
    // Middle section
    <Box>
      {/* Rendering post text */}
      <Renderer fontSize={["lg", "md"]} text={post?.postData?.text} />

      {/* Rendering post attachments if there are any */}
      {post?.postData?.attachments?.length !== 0 &&
        post?.postData?.attachments?.map((attachment) => {
          return (
            <object aria-label={attachment.url} data={attachment.url}></object>
          );
        })}
    </Box>
  );
};

export default Content;
