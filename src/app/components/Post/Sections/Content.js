import Asyncoload from "asyncoload";
import { Box, Image } from "@chakra-ui/react";
import "react-alice-carousel/lib/scss/alice-carousel.scss";

import Renderer from "../../../helpers/Renderer";

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
            //   Dynamic media loading
            <Asyncoload src={attachment.url} key={attachment.filename}>
              {({ type, src }) => {
                if (type.startsWith("image")) {
                  <Image src={src} />;
                } else if (type.startsWith("video")) {
                  <video>
                    <source src={src}></source>
                  </video>;
                }
              }}
            </Asyncoload>
          );
        })}
    </Box>
  );
};

export default Content;
