import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Spinner,
  Text,
  Center,
  DrawerCloseButton,
  Stack,
} from "@chakra-ui/react";

import Notification from "./Notification/index";
import { useFetchNotifications } from "../../api/hooks";

const Notifications = ({ onClose, isOpen }) => {
  const { data, isFetched, isError } = useFetchNotifications();

  return (
    <Drawer
      // size={["full", "xs"]}
      placement={"right"}
      onClose={onClose}
      isOpen={isOpen}
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton
            _focus={{
              outline: "none",
            }}
          />
          <DrawerHeader borderBottomWidth={"1px"}>Notifications</DrawerHeader>
          <DrawerBody>
            {!isFetched ? (
              <Center>
                <Spinner />
              </Center>
            ) : isError || data.error ? (
              <Center>
                <Text fontWeight={"semibold"} color={"red.500"}>
                  There was an error
                </Text>
              </Center>
            ) : data.length === 0 ? (
              <Center>
                <Text fontWeight={"bold"} fontSize={"md"}>
                  You don't have any notifications yet
                </Text>
              </Center>
            ) : (
              <Stack spacing={4}>
                {data.map((notification) => {
                  return (
                    <Notification
                      key={notification?.notificationData?._id}
                      data={notification}
                    />
                  );
                })}
              </Stack>
            )}
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default Notifications;
