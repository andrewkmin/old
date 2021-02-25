import Asyncoload from "asyncoload";
import { Box } from "@chakra-ui/react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/scss/alice-carousel.scss";

import Renderer from "../../../../helpers/Renderer";

const Middle = ({ post }) => {
  return (
    // Middle section
    <Box my={2}>
      {/* Rendering post text */}
      <Renderer fontSize={"md"} text={post?.postData?.text} />

      {/* If attachment length is not equal to zero, then return a carousel with all of the attachments */}
      {post?.postData?.attachments?.length !== 0 && (
        // Carousel
        <AliceCarousel name={post?.postData?._id}>
          {post?.postData?.attachments?.map((attachment) => {
            return (
              //   Dynamic media loading
              <Asyncoload src={attachment.url} key={attachment.filename} />
            );
          })}
        </AliceCarousel>
      )}
    </Box>
  );
};

export default Middle;
