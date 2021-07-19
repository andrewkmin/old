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
  Tooltip,
  Switch,
  useColorMode,
  FormControl,
  FormLabel,
  chakra,
} from "@chakra-ui/react";
import { IoMdSettings } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { BsFillCaretDownFill } from "react-icons/bs";

const OtherOptionsMenu = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Menu>
      <Tooltip label={"More options"}>
        <IconButton
          ms={2}
          isRound
          icon={
            <Center>
              <BsFillCaretDownFill />
            </Center>
          }
          as={MenuButton}
          aria-label={"Open menu"}
        />
      </Tooltip>

      <MenuList mt={5} me={2}>
        <MenuItem
          as={NavLink}
          to={"/settings"}
          icon={<IoMdSettings fontSize={"20px"} />}
        >
          Settings
        </MenuItem>

        <MenuDivider />

        <Box px={2} py={1}>
          <chakra.span>
            Color mode: {colorMode === "light" ? "🌞" : "🌚"}
          </chakra.span>
          <Switch ms={3} onChange={toggleColorMode} />
        </Box>

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

export default OtherOptionsMenu;
