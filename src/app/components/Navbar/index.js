import {
  Flex,
  Spacer,
  Text,
  useColorModeValue,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import DropdownMenu from "./Menu/DropdownMenu";
import DataContext from "../../data/data.context";

const Navbar = () => {
  const { userData } = useContext(DataContext);

  return (
    <Flex
      p={2}
      mb={10}
      top={0}
      pos={"sticky"}
      zIndex={"sticky"}
      borderBottom={"1px"}
      bg={useColorModeValue("gray.50", "gray.700")}
      borderColor={useColorModeValue("gray.300", "gray.700")}
    >
      {/* Logo */}
      <Flex alignItems={"center"}>
        <NavLink to={"/"}>
          <Text color={"teal.400"} fontSize={"2xl"} fontWeight={"semibold"}>
            Usocial
          </Text>
        </NavLink>
      </Flex>

      <Spacer />

      {/* Actions */}
      <Stack direction={"row"}>
        {/* Current account link */}
        <IconButton
          as={NavLink}
          isRound={true}
          variant={"ghost"}
          borderColor={"gray.400"}
          to={`/users/${userData?.id}`}
        >
          <Stack alignItems={"center"} direction={"row"}>
            {/* <Avatar size={"sm"} src={userData?.avatar} /> */}
            <Text fontWeight={"bold"}>{userData?.firstName}</Text>
          </Stack>
        </IconButton>

        <DropdownMenu />
      </Stack>
    </Flex>
  );
};

export default Navbar;
