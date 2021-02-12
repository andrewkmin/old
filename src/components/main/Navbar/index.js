import {
  Flex,
  Spacer,
  Box,
  Text,
  Center,
  Image,
  useColorModeValue,
  IconButton,
  Avatar,
} from "@chakra-ui/react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { BsBellFill } from "react-icons/bs";

import DropdownMenu from "./menu/DropdownMenu";
import _DataContext from "../../../data/data.context";

const Navbar = () => {
  const { userData } = useContext(_DataContext);

  return (
    <Flex
      borderBottom={"1px"}
      borderColor={useColorModeValue("gray.300", "gray.700")}
      bg={useColorModeValue("gray.50", "gray.700")}
      zIndex={"sticky"}
      boxShadow={"md"}
      pos={"sticky"}
      mb={10}
      top={0}
      p={2}
    >
      <Box me={1}>
        <Center>
          <NavLink to="/">
            <Image boxSize={"40px"} src={"/favicon.ico"} alt={"Logo"} />
          </NavLink>
        </Center>
      </Box>

      <Spacer />

      <Box ms={1}>
        <IconButton
          as={NavLink}
          to={`/users/${userData._id}`}
          _focus={false}
          variant={"ghost"}
          isRound
          ps={1}
          pe={3}
          pt={2}
          pb={2}
        >
          <Flex>
            <Box>
              <Avatar size={"sm"} src={userData?.pictureUrl} />
            </Box>

            <Center ms={1} as={Box}>
              <Text fontWeight={"bold"}>{userData?.firstName}</Text>
            </Center>
          </Flex>
        </IconButton>

        <IconButton
          as={NavLink}
          to={"/notifications"}
          _focus={false}
          isRound
          ms={2}
          icon={<BsBellFill />}
        />

        <DropdownMenu />
      </Box>
    </Flex>
  );
};

export default Navbar;
