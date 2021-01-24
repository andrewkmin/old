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
} from "@chakra-ui/react";
import { Link, Redirect } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

// Icons
import { GrUser } from "react-icons/gr";
import { RiBugLine } from "react-icons/ri";
import { MdNotifications } from "react-icons/md";
import { RiListSettingsFill } from "react-icons/ri";

import _axios from "../helpers/_axios";
import _AuthContext from "../auth/auth.context";

const Navbar = () => {
  const toast = useToast();
  const [userData, setUserData] = useState({});
  const AuthContext = useContext(_AuthContext);

  const handleLogout = async () => {
    const { data } = await _axios.post("/auth/logout");

    if (data) {
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
    const fetchAccount = async () => {
      const { data } = await _axios.get("/api/accounts/fetch");
      setUserData(data);
      return data;
    };
    fetchAccount();
  }, []);

  return (
    <Flex
      zIndex="sticky"
      pos="sticky"
      top="0"
      borderBottom="1px"
      borderColor="gray.200"
      mb={10}
      p={2}
      bgColor="white"
    >
      <Box me={1}>
        <Link to="/">
          <Flex>
            <Center>
              <Image src="/favicon.ico" h={35} alt="Website Logo" />
            </Center>
          </Flex>
        </Link>
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
                {userData.fullName}
              </Text>
            </MenuButton>
            <MenuList mt={1}>
              <MenuGroup title="General">
                <MenuItem as={Link} to={`/users/${userData._id}`}>
                  <Box mr="5px">
                    <GrUser />
                  </Box>
                  My account
                </MenuItem>
                <MenuItem as={Link} to="/notifications">
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
                <MenuItem>
                  <Box mr="5px">
                    <RiBugLine />
                  </Box>
                  Report a bug
                </MenuItem>

                <MenuItem as={Link} to="/settings">
                  <Box mr="5px">
                    <RiListSettingsFill />
                  </Box>
                  User Settings
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
