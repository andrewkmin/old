import { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { TiUserAdd } from "react-icons/ti";
import { FiUserCheck } from "react-icons/fi";
import { RiSettingsFill } from "react-icons/ri";
import { Progress, Button, Box, Stack } from "@chakra-ui/react";
import { BiCheck, BiMessageDetail, BiTime } from "react-icons/bi";

import DataContext from "../../../data/data.context";
import { useCheckFriendShip } from "../../../api/hooks";

const Buttons = ({ isFetching, data }) => {
  const { state } = useContext(DataContext);
  const { data: frData, isFetching: frIsFetching } = useCheckFriendShip(
    data?._id
  );

  const FriendshipStatusButtons = () => {
    if (state?.userData?._id !== data?._id) {
      if (frIsFetching) {
        return <Button w={"full"} isLoading={true}></Button>;
      } else {
        if (frData?.approved) {
          return (
            <Button w={"full"} leftIcon={<FiUserCheck />} colorScheme={"green"}>
              Friends
            </Button>
          );
        } else if (frData?.pending) {
          return (
            <Button w={"full"} leftIcon={<BiTime />} colorScheme={"orange"}>
              Requested
            </Button>
          );
        } else if (frData?.requested) {
          return (
            <>
              <Button w={"full"} leftIcon={<BiCheck />} colorScheme={"orange"}>
                Approve friend request
              </Button>
              <Button w={"full"} leftIcon={<FaTimes />} colorScheme={"orange"}>
                Decline friend request
              </Button>
            </>
          );
        } else {
          return (
            <Button w={"full"} leftIcon={<TiUserAdd />} colorScheme={"green"}>
              Add friend
            </Button>
          );
        }
      }
    } else {
      return null;
    }
  };

  const MessageButton = () => {
    if (state?.userData?._id !== data?._id) {
      if (data?.friends?.approved?.includes(state?.userData?._id)) {
        return (
          <Button leftIcon={<BiMessageDetail />} colorScheme={"blue"}>
            Message
          </Button>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  return (
    <Box mt={5}>
      {isFetching ? (
        <Progress size={"xs"} isIndeterminate />
      ) : (
        <Stack direction={["column", "row"]}>
          <FriendshipStatusButtons />
          <MessageButton />

          {state?.userData?._id === data?._id && (
            <Button
              w={"full"}
              as={NavLink}
              to={"/settings"}
              leftIcon={<RiSettingsFill />}
              colorScheme={"gray"}
            >
              Settings
            </Button>
          )}
        </Stack>
      )}
    </Box>
  );
};

export default Buttons;