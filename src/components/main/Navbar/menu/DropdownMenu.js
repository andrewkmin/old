import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Center,
  IconButton,
  MenuDivider,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { BsFillCaretDownFill, BsFillGearFill } from "react-icons/bs";

import LogoutButton from "../buttons/LogoutButton";

const DropdownMenu = () => {
  return (
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
        <MenuItem as={NavLink} to={"/settings"}>
          <Box mr={"5px"}>
            <BsFillGearFill />
          </Box>
          Settings
        </MenuItem>

        <MenuDivider />

        {/* <Center p={2}>
            <Button as={Link} to={"/logout"} colorScheme={"red"} w={"full"}>
              Logout
            </Button>
          </Center> */}
        <LogoutButton />
      </MenuList>
    </Menu>
  );
};

export default DropdownMenu;
