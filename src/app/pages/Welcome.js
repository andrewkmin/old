import { format } from "date-fns";
import Auth from "../components/Auth/index";
import { Helmet } from "react-helmet-async";
import FirstTimeGreeting from "../components/FirstTimeGreeting";
import { Box, Center, Flex, Link, Stack, Text } from "@chakra-ui/react";

// The welcome/authentication page
const Welcome = () => {
  // Checking if this is the first time the user accesses the site
  const isFirstTime = JSON.parse(localStorage.isFirstTime || null);
  // After this component renders setting the value to false
  localStorage.isFirstTime = false;

  return (
    <>
      <Helmet>
        {/* Main Meta Tags */}
        <title>Welcome to Usocial</title>
        <meta name="language" content="English" />
        <meta property="locale" content="en_US" />
        <meta name="robots" content="index, follow" />
        <meta name="revisit-after" content="1 days" />
        <meta name="title" content="Welcome to Usocial" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
          name="description"
          content="Usocial is a next-gen privacy oriented social media networking platform."
        />
        <meta
          name="keywords"
          content="social media website, social, media, videos, images, text, comment"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Usocial" />
        <meta property="og:title" content="Welcome to Usocial" />
        <meta
          property="og:description"
          content="Usocial is a next-gen privacy oriented social media networking platform."
        />

        {/* Twitter Meta Tags */}
        <meta property="twitter:type" content="website" />
        <meta property="twitter:locale" content="en_US" />
        <meta property="twitter:site_name" content="Usocial" />
        <meta property="twitter:title" content="Welcome to Usocial" />
        <meta
          property="twitter:description"
          content="Usocial is a next-gen privacy oriented social media networking platform."
        />
      </Helmet>

      <Box minH={"100vh"}>
        {isFirstTime && <FirstTimeGreeting />}

        <Flex minH={"90vh"} alignItems={"center"} justifyContent={"center"}>
          <Auth />
        </Flex>

        <Center
          bottom={0}
          ms={[0, 3]}
          pe={[0, 3]}
          pb={[0, 3]}
          right={[null, 0]}
          pos={["relative", "absolute"]}
        >
          <Stack
            w={"full"}
            direction={"row"}
            color={"gray.400"}
            justifyContent={["center", null]}
          >
            <Link fontSize={"sm"}>Privacy Policy</Link>
            <Link fontSize={"sm"}>Terms of Service</Link>
            <Text fontWeight={"semibold"} fontSize={"sm"}>
              &copy; Usocial {format(Date.now(), "yyyy")}
            </Text>
          </Stack>
        </Center>
      </Box>
    </>
  );
};

export default Welcome;
