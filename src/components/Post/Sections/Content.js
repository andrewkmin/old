import Asyncoload from "asyncoload";
import { Box } from "@chakra-ui/react";
import "react-alice-carousel/lib/scss/alice-carousel.scss";

import Renderer from "../../../helpers/Renderer";

const Content = ({ post }) => {
  return (
    // Middle section
    <Box my={2}>
      {/* Rendering post text */}
      <Renderer fontSize={["lg", "md"]} text={post?.postData?.text} />
      {/* If attachment length is not equal to zero, then return a carousel with all of the attachments */}
      {post?.postData?.attachments?.length !== 0 &&
        post?.postData?.attachments?.map((attachment) => {
          return (
            //   Dynamic media loading
            <Asyncoload
              controls
              src={attachment.url}
              key={attachment.filename}
            />
          );
        })}
    </Box>
  );
};

export default Content;