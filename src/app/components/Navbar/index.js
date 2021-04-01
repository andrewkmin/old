import {
  Flex,
  Spacer,
  Box,
  Text,
  Center,
  Image,
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
import _DataContext from "../../data/data.context";

const Navbar = () => {
  const { userData } = useContext(_DataContext);
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
      borderBottom={"1px"}
      borderColor={useColorModeValue("gray.300", "gray.700")}
      bg={useColorModeValue("gray.50", "gray.700")}
      zIndex={"sticky"}
      boxShadow={"md"}
      pos={"sticky"}
      mb={10}
      top={0}
      p={2}
    >
      {/* Logo */}
      <Box me={1}>
        <Center>
          <NavLink to="/">
            <Image boxSize={"40px"} src={"/favicon.ico"} alt={"Logo"} />
          </NavLink>
        </Center>
      </Box>

      <Spacer />

      <Box ms={1}>
        <Stack direction={"row"}>
          {/* Current Account */}
          <IconButton
            as={NavLink}
            to={`/users/${userData?._id}`}
            variant={"ghost"}
            isRound
          >
            <Flex px={1}>
              <Box>
                {/* User avatar */}
                <Avatar size={"sm"} src={userData?.avatar} />
              </Box>

              {/* First name */}
              <Center as={Box}>
                <Text fontWeight={"bold"}>{userData?.firstName}</Text>
              </Center>
            </Flex>
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
