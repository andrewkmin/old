import { Box, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

const Reactions = ({ post }) => {
  const numOfHearts = useRef(() => {});
  const [state, setState] = useState({
    hearts: {
      number: post?.hearts?.length,
      prefix: "",
    },
  });

  numOfHearts.current = () => {
    switch (state.hearts.number) {
      case state.hearts.number > 1000 && state.hearts.number < 999999999: {
        return setState({
          hearts: {
            prefix: "K",
          },
        });
      }
      default: {
        return setState({ hearts: { number: state.hearts.number } });
      }
    }
  };

  useEffect(() => {
    numOfHearts.current();
    return () => {};
  }, []);

  return (
    <Box>
      <Text fontSize={"sm"} fontWeight={"semibold"}>
        {state.hearts.number !== 0 && (
          <span>
            {state.hearts.number} {state.hearts.prefix} people reacted
          </span>
        )}
      </Text>
    </Box>
  );
};

export default Reactions;
