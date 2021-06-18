import { Helmet } from "react-helmet-async";
import {
  Avatar,
  Box,
  Center,
  chakra,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useContext } from "react";
import DataContext from "../data/data.context";
import Section from "../components/Section";

// The settings page
const Settings = () => {
  const { userData } = useContext(DataContext);
  const { setColorMode, colorMode } = useColorMode();

  // For updating theme prefrence on the account also
  const handleThemeChange = (event) => {
    // Prevent default behavior
    event.preventDefault();
    // Get dark and light buttons
    const { dark, light } = event.target;
    console.log({ dark, light });
  };

  return (
    <>
      <Helmet>
        <title>Settings - Usocial</title>
      </Helmet>

      <Box>
        <Stack spacing={10}>
          <Box>
            <Center>
              <Box pb={5} borderColor={"green"} borderBottom={"2px"}>
                <Text fontSize={["xl", "2xl", "3xl"]}>
                  Welcome to your settings,{" "}
                  <chakra.span
                    userSelect={"none"}
                    textDecor={"underline"}
                    fontWeight={"semibold"}
                  >
                    {userData?.firstName}
                  </chakra.span>
                  .
                </Text>
              </Box>
            </Center>
          </Box>

          <Stack spacing={5}>
            <Section
              title={"Theme"}
              subtitle={"Choose the best theme that you like"}
            >
              <form onSubmit={handleThemeChange}>
                <Stack direction={"row"}>
                  <chakra.button
                    p={2}
                    w={"full"}
                    color={"#272727"}
                    borderRadius={"lg"}
                    _hover={{
                      bgColor: "#E5EBEA",
                    }}
                    _disabled={{
                      bgColor: "#E5EBEA",
                      cursor: "not-allowed",
                    }}
                    name={"light"}
                    type={"submit"}
                    bgColor={"#fafafa"}
                    disabled={colorMode === "light"}
                    onClick={() => setColorMode("light")}
                  >
                    Light Theme
                  </chakra.button>

                  <chakra.button
                    p={2}
                    name={"dark"}
                    w={"full"}
                    color={"white"}
                    _hover={{
                      bgColor: "black",
                    }}
                    type={"submit"}
                    borderRadius={"lg"}
                    bgColor={"#353535"}
                    _disabled={{
                      cursor: "not-allowed",
                      bgColor: "#353535",
                    }}
                    disabled={colorMode === "dark"}
                    onClick={() => setColorMode("dark")}
                  >
                    Dark theme
                  </chakra.button>
                </Stack>
              </form>
            </Section>

            <Section
              title={"Avatar"}
              subtitle={
                "Here you can see your avatar in all sizes and also change it!"
              }
            >
              <Stack alignItems={"flex-end"} direction={"row"}>
                <Avatar
                  size={"lg"}
                  bgColor={"gray.200"}
                  src={userData?.avatar}
                />
                <Avatar
                  size={"md"}
                  bgColor={"gray.200"}
                  src={userData?.avatar}
                />
                <Avatar
                  size={"sm"}
                  bgColor={"gray.200"}
                  src={userData?.avatar}
                />
              </Stack>
            </Section>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Settings;
