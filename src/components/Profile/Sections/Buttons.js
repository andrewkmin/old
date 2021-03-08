import { NavLink } from "react-router-dom";
import { Progress, Button, Box, Stack } from "@chakra-ui/react";
import { RiMessage2Fill, RiSettingsFill } from "react-icons/ri";

import verification from "../../../auth/verification";

const Buttons = ({ isFetching, data }) => {
  return (
    <Box mt={5}>
      {isFetching ? (
        <Progress size={"xs"} isIndeterminate />
      ) : (
        <Stack direction={["column", "row"]}>
          {verification.id === data._id ? (
            <>
              <Button
                w={"full"}
                as={NavLink}
                to={"/settings"}
                leftIcon={<RiSettingsFill />}
                colorScheme={"gray"}
              >
                Settings
              </Button>
            </>
          ) : (
            <>
              {/* 
                // ! TODO: Add button based on current status of friendship
              */}
              {/* {friendshipStatus?.approved ? (
                    <Button
                      w={"full"}
                      leftIcon={<FaUsers />}
                      colorScheme={"cyan"}
                    >
                      Friends
                    </Button>
                  ) : friendshipStatus?.pending ? (
                    <Button
                      w={"full"}
                      leftIcon={<FaCheck />}
                      colorScheme={"orange"}
                    >
                      Accept friend request
                    </Button>
                  ) : friendshipStatus?.requested ? (
                    <Button
                      w={"full"}
                      leftIcon={<BsClock />}
                      colorScheme={"yellow"}
                    >
                      Pending
                    </Button>
                  ) : (
                    <Button
                      w={"full"}
                      leftIcon={<BsPersonPlusFill />}
                      colorScheme={"green"}
                    >
                      Add friend
                    </Button>
                  )} */}

              <Button
                w={"full"}
                leftIcon={<RiMessage2Fill />}
                colorScheme={"blue"}
              >
                Message
              </Button>
            </>
          )}
        </Stack>
      )}
    </Box>
  );
};

export default Buttons;
