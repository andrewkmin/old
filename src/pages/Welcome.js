import { sample } from "lodash";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Box, Center, Flex, Spacer, Text } from "@chakra-ui/react";

import Auth from "../components/Auth/index";

const Welcome = () => {
  const [welcomeText, setWelcomeText] = useState("");

  useEffect(() => {
    const quotes = [
      "Usocial is a next-gen social network that aims to create a more protected web 🔒",
      "Usocial stands for -> You socialize 🤝",
      "Usocial has privacy baked-in 🧁",
    ];

    setImmediate(() => {
      setWelcomeText(sample(quotes));
    });

    setInterval(() => {
      setWelcomeText(sample(quotes));
    }, 5000);
  }, []);

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
      <Box>
        <Flex display={["none", "none", "flex"]}>
          <Box w={[null, "full"]} h={"100vh"} bg={"teal.400"}>
            <Center>
              <Text
                mt={[null, null, "80", "96"]}
                px={10}
                color={"white"}
                fontWeight={"bold"}
                fontSize={"xl"}
              >
                <motion.span
                  animate={{
                    opacity: [0, 1],
                  }}
                >
                  {welcomeText}
                </motion.span>
              </Text>
            </Center>
          </Box>

          <Spacer />

          <Box h={"100vh"} w={[null, "full"]}>
            <Center>
              <Box mt={[null, null, "44", "56"]}>
                <Auth />
              </Box>
            </Center>
          </Box>
        </Flex>

        <Box pt={"40"} display={["block", "block", "none"]}>
          <Center>
            <Auth />
          </Center>
        </Box>
      </Box>
    </>
  );
};

export default Welcome;
