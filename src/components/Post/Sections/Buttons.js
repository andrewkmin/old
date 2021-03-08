// import { useContext } from "react";
import { BiChat, BiShare } from "react-icons/bi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Box, Button, Stack, useToast } from "@chakra-ui/react";

import _axios from "../../../api/_axios";
// import DataContext from "../../../../data/data.context";

const Bottom = ({ post, states, setState }) => {
  const Toast = useToast();
  // const { userData } = useContext(DataContext);

  const heartPost = async () => {
    const { data } = await _axios.put(
      `/api/posts/heart/?postId=${post?.postData?._id}`
    );

    if (!data.hasOwnProperty("error")) {
      setState({
        hearted: true,
      });
    } else {
      return Toast({
        title: "There was an error",
        description: data.error,
        isClosable: false,
        duration: 2000,
        status: "error",
      });
    }
  };

  const unheartPost = async () => {
    const { data } = await _axios.put(
      `/api/posts/unheart/?postId=${post?.postData?._id}`
    );

    if (!data.hasOwnProperty("error")) {
      setState({ hearted: false });
    } else {
      return Toast({
        title: "There was an error",
        description: data.error,
        isClosable: false,
        duration: 2000,
        status: "error",
      });
    }
  };

  return (
    <Box>
      {/* Button flex */}
      <Stack spacing={2} direction={["column", "row"]}>
        {/* Heart button */}
        <Button
          w={"full"}
          isLoading={states.hearting}
          loadingText={states.hearted ? "Unhearting" : "Hearting"}
          leftIcon={states.hearted ? <AiFillHeart /> : <AiOutlineHeart />}
          colorScheme={states.hearted ? "red" : null}
          onClick={states.hearted ? () => unheartPost() : () => heartPost()}
        >
          {states.hearted ? "Unheart" : "Heart"}
        </Button>

        {/* Comment button */}
        <Button leftIcon={<BiChat />} w={"full"}>
          Comment
        </Button>

        {/* Share button */}
        <Button leftIcon={<BiShare />} w={"full"}>
          Share
        </Button>
      </Stack>
    </Box>
  );
};

export default Bottom;
