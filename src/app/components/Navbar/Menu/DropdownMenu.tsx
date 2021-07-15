import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Center,
  IconButton,
  MenuDivider,
  Box,
  Button,
} from "@chakra-ui/react";
import { IoMdSettings } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { BsFillCaretDownFill } from "react-icons/bs";

const DropdownMenu = () => {
  return (
    <Menu>
      <IconButton
        aria-label={"Open dropdown"}
        as={MenuButton}
        ms={2}
        isRound
        icon={
          <Center>
            <BsFillCaretDownFill />
          </Center>
        }
      />

      <MenuList mt={5} me={2}>
        <MenuItem
          icon={<IoMdSettings fontSize={"20px"} />}
          as={NavLink}
          to={"/settings"}
        >
          Settings
        </MenuItem>

        <MenuDivider />

        <Box px={2} py={1}>
          <Button
            as={Link}
            w={"full"}
            to={"/logout"}
            colorScheme={"purple"}
            bgColor={"purple.500"}
          >
            Logout
          </Button>
        </Box>
      </MenuList>
    </Menu>
  );
};

export default DropdownMenu;
