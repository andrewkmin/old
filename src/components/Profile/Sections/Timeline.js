import { Box } from "@chakra-ui/react";

import PostList from "../../PostList";
import CreatePost from "../../Create/index";
import verification from "../../../auth/verification";
import { useEffect } from "react";

const Timeline = ({ data }) => {
  useEffect(() => {
    const verify = async () => {
      await verification.verify();
    };
    verify();
  }, []);

  return (
    <Box mt={10}>
      {verification.id === data?._id && <CreatePost />}
      <PostList />
    </Box>
  );
};

export default Timeline;
