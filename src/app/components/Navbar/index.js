import {
  Flex,
  Spacer,
  Box,
  Text,
  useColorModeValue,
  IconButton,
  Avatar,
  useDisclosure,
  Portal,
  Stack,
} from "@chakra-ui/react";
import { filter } from "lodash";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { RiNotification3Fill } from "react-icons/ri";

import Notifications from "../Notifications";
import DropdownMenu from "./Menu/DropdownMenu";
import DataContext from "../../data/data.context";

const Navbar = () => {
  const { userData } = useContext(DataContext);
  const unreadNotifications = filter(userData.notifications, (notification) => {
    return !notification.seen;
  });

  const {
    onOpen: notifDrawerOnOpen,
    onClose: notifDrawerOnClose,
    isOpen: notifDrawerIsOpen,
  } = useDisclosure();

  return (
    <Flex
      p={2}
      mb={10}
      top={0}
      pos={"sticky"}
      zIndex={"sticky"}
      borderBottom={"1px"}
      bg={useColorModeValue("gray.50", "gray.700")}
      borderColor={useColorModeValue("gray.300", "gray.700")}
    >
      {/* Logo */}
      <Flex alignItems={"center"}>
        <Box>
          <NavLink to={"/"}>
            <Text fontSize={"2xl"} fontWeight={"semibold"}>
              Usocial
            </Text>
          </NavLink>
        </Box>
      </Flex>

      <Spacer />

      <Box>
        <Stack direction={"row"}>
          <IconButton
            isRound
            as={NavLink}
            border={"2px"}
            variant={"ghost"}
            borderColor={"gray.400"}
            to={`/users/${userData?._id}`}
          >
            <Stack alignItems={"center"} direction={"row"} px={2}>
              <Avatar size={"sm"} src={userData?.avatar} />
              <Text fontWeight={"bold"}>{userData?.firstName}</Text>
            </Stack>
          </IconButton>

          {/* Notification drawer trigger */}
          <IconButton
            isRound
            onClick={notifDrawerOnOpen}
            icon={
              <RiNotification3Fill
                color={unreadNotifications.length === 0 ? null : "red.400"}
              />
            }
          />

          {/* Notification drawer from the right */}
          <Portal>
            <Notifications
              onClose={notifDrawerOnClose}
              isOpen={notifDrawerIsOpen}
            />
          </Portal>

          {/* Dropdown menu for other things */}
          <DropdownMenu />
        </Stack>
      </Box>
    </Flex>
  );
};

export default Navbar;
