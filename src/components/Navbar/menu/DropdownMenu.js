import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Center,
  IconButton,
  MenuDivider,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { RiSettingsLine } from "react-icons/ri";
import { BsFillCaretDownFill } from "react-icons/bs";

import LogoutButton from "../Buttons/LogoutButton";

const DropdownMenu = () => {
  return (
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

      <MenuList mt={2} me={2}>
        <MenuItem
          icon={<RiSettingsLine fontSize={"20px"} />}
          as={NavLink}
          to={"/settings"}
        >
          Settings
        </MenuItem>

        <MenuDivider />

        <LogoutButton />
      </MenuList>
    </Menu>
  );
};

export default DropdownMenu;
