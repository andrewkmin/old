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
  useColorModeValue,
} from "@chakra-ui/react";
import { BiUser } from "react-icons/bi";
import { RiBugLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import _DataContext from "../data/data.context";
import { MdNotifications } from "react-icons/md";
import { RiListSettingsFill } from "react-icons/ri";
import { useEffect, useState, useContext } from "react";

const Navbar = () => {
  const [userData, setUserData] = useState({});
  const DataContext = useContext(_DataContext);

  useEffect(() => {
    setUserData(DataContext.userData);
    return DataContext.userData;
  }, [DataContext.userData]);

  return (
    <Flex
      borderBottom="1px"
      borderColor={useColorModeValue("gray.300", "gray.700")}
      bg={useColorModeValue("gray.50", "gray.700")}
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
                    <MdNotifications />
                  </Box>
                  Notifications
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
                  <Button
                    colorScheme="red"
                    w="full"
                    onClick={/*handleLogout*/ () => {}}
                  >
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
