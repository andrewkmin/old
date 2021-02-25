import { Box, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

const Reactions = ({ post }) => {
  const [state, setState] = useState({
    hearts: {
      fetched: post?.postData?.hearts?.length,
      rendered: "",
    },
  });

  const numOfHearts = useRef(() => {});

  numOfHearts.current = () => {
    switch (state.hearts.fetched) {
      case state.hearts.fetched > 1000: {
        return setState({
          hearts: {
            rendered:
              state.hearts.fetched.toString().substring(0, 1).toString() + "K",
          },
        });
      }
      default: {
        return setState({ hearts: { rendered: state.hearts.fetched } });
      }
    }
  };

  useEffect(() => {
    numOfHearts.current();
  }, []);

  return (
    <Box my={2}>
      <Text fontSize={"sm"} fontWeight={"semibold"}>
        {state.hearts.rendered} people reacted
      </Text>
    </Box>
  );
};

export default Reactions;
