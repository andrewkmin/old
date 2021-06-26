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
import { IoMdSettings } from "react-icons/io";
import LogoutButton from "../Buttons/LogoutButton";
import { BsFillCaretDownFill } from "react-icons/bs";

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
          icon={<IoMdSettings fontSize={"20px"} />}
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
