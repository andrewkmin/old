import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Spacer,
  Box,
  Text,
  Center,
  Image,
  useColorModeValue,
  IconButton,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import { BiBell } from "react-icons/bi";
import _DataContext from "../data/data.context";
import { Link, NavLink } from "react-router-dom";
import { RiListSettingsFill } from "react-icons/ri";
import { BsFillCaretDownFill } from "react-icons/bs";
import React, { useEffect, useState, useContext } from "react";

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
        <IconButton
          as={NavLink}
          to={`/users/${userData._id}`}
          _focus={false}
          isRound
          pt={3}
          pb={3}
          ps={1}
          pe={2}
        >
          <Flex>
            <Box>
              <Avatar size="sm" src={userData?.pictureUrl} />
            </Box>

            <Center ms={1} as={Box}>
              <Text fontWeight="bold">{userData?.firstName}</Text>
            </Center>
          </Flex>
        </IconButton>

        <IconButton
          as={NavLink}
          to="/notifications"
          _focus={false}
          isRound
          ms={2}
          icon={<BiBell />}
        />

        <Menu>
          <IconButton
            as={MenuButton}
            ms={2}
            _focus={false}
            isRound
            icon={
              <Center>
                <BsFillCaretDownFill />
              </Center>
            }
          />

          <MenuList mt={1}>
            <MenuItem as={NavLink} to="/settings">
              <Box mr="5px">
                <RiListSettingsFill />
              </Box>
              Settings
            </MenuItem>

            <Divider />

            <Center p={2}>
              <Button as={Link} to="/logout" colorScheme="red" w="full">
                Logout
              </Button>
            </Center>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Navbar;
