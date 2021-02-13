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
  MenuDivider,
} from "@chakra-ui/react";
import _DataContext from "../data/data.context";
import { Link, NavLink } from "react-router-dom";
import {
  BsBellFill,
  BsFillCaretDownFill,
  BsFillGearFill,
} from "react-icons/bs";
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
          
          variant="ghost"
          isRound
          ps={1}
          pe={3}
          pt={2}
          pb={2}
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
          
          isRound
          ms={2}
          icon={<BsBellFill />}
        />

        <Menu>
          <IconButton
            as={MenuButton}
            ms={2}
            
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
                <BsFillGearFill />
              </Box>
              Settings
            </MenuItem>

            <MenuDivider />

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
