import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Flex,
  Spacer,
  Box,
  Text,
  Center,
  Image,
  useToast,
  useColorMode,
} from "@chakra-ui/react";
import { NavLink, Redirect } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

// Icons
import { BiUser } from "react-icons/bi";
import { RiBugLine } from "react-icons/ri";
import { MdNotifications } from "react-icons/md";
import { RiListSettingsFill } from "react-icons/ri";

import _axios from "../utils/_axios";
import WebSocket from "../utils/websocket";

import _AuthContext from "../auth/auth.context";
import _DataContext from "../utils/data.context";

const Navbar = () => {
  const toast = useToast();
  const { colorMode } = useColorMode();
  const [userData, setUserData] = useState({});
  const DataContext = useContext(_DataContext);
  const AuthContext = useContext(_AuthContext);

  const handleLogout = async () => {
    const { data } = await _axios.post("/auth/logout");

    if (data) {
      WebSocket.close();
      AuthContext.setAuthenticated(false);
      toast({
        position: "bottom-left",
        title: "You are now logged out",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
      return <Redirect to="/logout" />;
    }
  };

  useEffect(() => {
    setUserData(DataContext.userData);
    return DataContext.userData;
  }, [DataContext.userData]);

  return (
    <Flex
      borderBottom="1px"
      borderColor={colorMode === "light" ? "gray.300" : "gray.700"}
      bg={colorMode === "light" ? "gray.50" : "gray.700"}
      zIndex="sticky"
      boxShadow="md"
      pos="sticky"
      mb={10}
      top="0"
      p={2}
    >
      <Box me={1}>
        <Center>
          <NavLink to="/">
            <Image
              src="/favicon.ico"
              style={{
                height: 40,
              }}
              alt="Website Logo"
            />
          </NavLink>
        </Center>
      </Box>

      <Spacer />

      <Box ms={1}>
        <Center>
          <Menu>
            <MenuButton
              _focusVisible={false}
              _focus={false}
              colorScheme="teal"
              size="md"
              as={Button}
            >
              <Text fontSize="sm" isTruncated>
                {userData?.fullName}
              </Text>
            </MenuButton>
            <MenuList mt={1}>
              <MenuGroup title="General">
                <MenuItem as={NavLink} to={`/users/${userData._id}`}>
                  <Box mr="5px">
                    <BiUser />
                  </Box>
                  My account
                </MenuItem>
                <MenuItem as={NavLink} to="/notifications">
                  <Box mr="5px">
                    <MdNotifications
                      color={
                        userData?.friends?.pending?.length === 0 ? "" : "red"
                      }
                    />
                  </Box>
                  <span
                    color={
                      userData?.friends?.pending?.length === 0 ? "" : "red"
                    }
                  >
                    Notifications
                  </span>
                </MenuItem>
              </MenuGroup>

              <MenuDivider />

              <MenuGroup title="Other">
                <MenuItem
                // TODO: Add a redirect to https://linear.app/usocial/team/USO
                >
                  <Box mr="5px">
                    <RiBugLine />
                  </Box>
                  Report a bug
                </MenuItem>

                <MenuItem as={NavLink} to="/settings">
                  <Box mr="5px">
                    <RiListSettingsFill />
                  </Box>
                  Settings
                </MenuItem>

                <Center p={2}>
                  <Button colorScheme="red" w="full" onClick={handleLogout}>
                    Logout
                  </Button>
                </Center>
              </MenuGroup>
            </MenuList>
          </Menu>
        </Center>
      </Box>
    </Flex>
  );
};

export default Navbar;
