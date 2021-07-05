import {
  Flex,
  Spacer,
  Text,
  useColorModeValue,
  IconButton,
  Stack,
  Avatar,
  Box,
  Button,
} from "@chakra-ui/react";
import { useContext } from "react";
import { IoAdd } from "react-icons/io5"
import { NavLink } from "react-router-dom";
// import DropdownMenu from "./Menu/DropdownMenu";
import DataContext from "../../data/data.context";

const Navbar = () => {
  const { userData } = useContext(DataContext);

  return (
    <Flex
      mb={8}
      top={0}
      p={[2, 3]}
      pos={"sticky"}
      zIndex={"sticky"}
      borderBottom={"2px"}
      bg={useColorModeValue("gray.50", "gray.700")}
      borderColor={useColorModeValue("gray.300", "gray.700")}
    >
      {/* Logo */}
      <Flex alignItems={"center"}>
        <NavLink to={"/"}>
          <Text
            fontSize={["2xl", "3xl"]}
            color={"teal.400"}
            fontWeight={"bold"}
            fontFamily={"Ubuntu Bold"}
          >
            Usocial
          </Text>
        </NavLink>
      </Flex>

      <Spacer />

      {/* Actions */}
      <Stack spacing={4} alignItems={"center"} direction={"row"}>
        <Box>
          {/* Current account link */}
          <IconButton
            as={NavLink}
            isRound={true}
            variant={"ghost"}
            borderColor={"gray.400"}
            aria-label={"Your account"}
            to={`/users/${userData?.id}`}
          >
            <Stack px={1} alignItems={"center"} direction={"row"}>
              {/* Account avatar */}
              <Avatar
                size={"sm"}
                src={userData?.avatar}
                name={userData?.firstName}
              />
              <Text fontSize={["lg", "xl"]} fontWeight={"bold"}>
                {userData?.firstName}
              </Text>
            </Stack>
          </IconButton>
        </Box>

        <Box>
          <Button leftIcon={<IoAdd />}>New Post</Button>
        </Box>

        {/* <DropdownMenu /> */}
      </Stack>
    </Flex>
  );
};

export default Navbar;
