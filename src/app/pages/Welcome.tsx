import {
  Alert,
  Box,
  Center,
  chakra,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import Auth from "../components/Auth/index";
import Verification from "../components/Verification";
import FirstTimeGreeting from "../components/FirstTimeGreeting";

// The welcome/authentication page
const Welcome = () => {
  // For rendering verification component on demand
  const params = new URLSearchParams(window.location.search);
  // Getting the `verify` parameter
  const verification = params.get("verification");

  // Random photo
  const photo =
    // "https://images.unsplash.com/photo-1535478044878-3ed83d5456ef?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=769&q=1080"
    "https://images.unsplash.com/photo-1603118675111-239b194fb8d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=100";
  // Checking if this is the first time the user accesses the site
  const isFirstTime = JSON.parse(localStorage.isFirstTime || null);

  /**
   * Image options:
   * 1. https://images.unsplash.com/photo-1621347924118-ac0aa8d40b59?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTh8fHB1cnBsZXxlbnwwfDF8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=100
   * 2. https://images.unsplash.com/photo-1603118675111-239b194fb8d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=100 (preferred)
   * 3. https://cdn.pixabay.com/photo/2017/07/08/11/45/purple-2484167_960_720.jpg
   */

  useEffect(() => {
    // On component mount, setting the value to false
    localStorage.isFirstTime = false;
  }, []);

  return (
    <Box minH={"100vh"}>
      <Alert bgColor={"purple.300"} pos={"absolute"}>
        <Text
          color={"gray.700"}
          fontWeight={"thin"}
          fontFamily={"ubuntu bold"}
          fontSize={["sm", "md", "lg"]}
        >
          We're still launching, if there are any issues please contact our
          support team at{" "}
          <chakra.a textDecor={"underline"} href={"mailto:support@polygon.am"}>
            support@polygon.am
          </chakra.a>
        </Text>
      </Alert>

      {isFirstTime !== false && <FirstTimeGreeting />}

      <Flex
        w={"100vw"}
        minH={"100vh"}
        alignItems={"center"}
        justifyContent={"space-between"}
        direction={["column-reverse", null, null, "row"]}
      >
        <Flex
          w={"full"}
          flexWrap={"wrap"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Image
            w={"100%"}
            zIndex={-1}
            src={photo}
            border={"none"}
            bgColor={"purple.400"}
            filter={"brightness(60%)"}
            borderColor={"transparent"}
            h={["50vh", null, null, "100vh"]}
          />

          <Image
            w={"15%"}
            zIndex={1}
            pos={"absolute"}
            filter={"brightness(0) invert(1)"}
          />
        </Flex>

        <Flex
          p={10}
          w={"full"}
          maxH={"100%"}
          minH={"50vh"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box h={"100%"}>
            <Center>
              <Stack mt={16} spacing={5} px={[5, null, null, 0]}>
                <Stack>
                  <Center>
                    <Heading fontWeight={"semibold"} fontSize={"5xl"}>
                      Polygon
                    </Heading>
                  </Center>

                  <Center>
                    <Text
                      fontSize={["xl", "2xl"]}
                      fontWeight={"thin"}
                      fontFamily={"ubuntu bold"}
                    >
                      Private gate to global network
                      {/* {"™"} */}
                    </Text>
                  </Center>
                </Stack>

                {!verification ? <Auth /> : <Verification sid={verification} />}
              </Stack>
            </Center>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Welcome;
