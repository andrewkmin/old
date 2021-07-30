import {
  Flex,
  Spacer,
  Text,
  useColorModeValue,
  IconButton,
  Stack,
  Avatar,
  Tooltip,
  Button,
} from "@chakra-ui/react";
import { useContext } from "react";
import { CgAddR } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import DataContext from "../../data/data.context";
import OtherOptionsMenu from "./Menu/OtherOptionsMenu";

const Navbar = () => {
  const { userData } = useContext(DataContext);

  return (
    <Flex
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
            fontWeight={"bold"}
            fontSize={["2xl", "3xl"]}
            fontFamily={"Ubuntu Bold"}
            color={useColorModeValue("purple.500", "purple.400")}
          >
            Polygon
          </Text>
        </NavLink>
      </Flex>

      <Spacer />

      {/* Actions */}
      <Stack ms={7} alignItems={"center"} direction={"row"}>
        <Button
          rounded={"xl"}
          leftIcon={<CgAddR />}
          colorScheme={"purple"}
          bgColor={useColorModeValue("purple.400", "purple.300")}
        >
          Create post
        </Button>

        {/* Current account link */}
        <Tooltip label={"My account"}>
          <IconButton
            as={NavLink}
            isRound={true}
            variant={"ghost"}
            borderColor={"gray.400"}
            aria-label={"Your account"}
            to={`/@${userData?.username}`}
          >
            {/* Account avatar */}
            <Avatar
              boxSize={"2em"}
              rounded={"xl"}
              src={userData?.avatar}
              name={userData?.username}
            />
          </IconButton>
        </Tooltip>

        <OtherOptionsMenu />
      </Stack>
    </Flex>
  );
};

export default Navbar;
