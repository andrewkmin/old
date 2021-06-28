import Media from "../../Media";
import Carousel from "../../Carousel";
import { Box, Text } from "@chakra-ui/react";
import { PostProps } from "../../../types";

// Post content
const Content = ({ data }: PostProps) => {
  return (
    // Middle section
    <Box>
      {/* Rendering post text */}
      <Text fontSize={["lg", "md"]}>{data.body}</Text>

      <Carousel>
        {/* Rendering post attachments if there are any */}
        {data?.attachments?.urls?.map((attachment) => {
          return (
            <Box key={attachment.url} p={2}>
              <Media url={attachment.url} mimetype={attachment.mimetype} />
            </Box>
          );
        })}
      </Carousel>
    </Box>
  );
};

export default Content;
