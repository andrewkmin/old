import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet-async";
import { useToast } from "@chakra-ui/toast";
import { useSendHeartbeat } from "../api/hooks";

const PlatformLayout = ({ children }) => {
  const Toast = useToast();
  const { data, isError, isFetched } = useSendHeartbeat();

  useEffect(() => {
    if (isFetched) {
      if (data?.error) {
        return Toast({
          title: "We're having issues connecting you to our servers",
          status: "error",
          duration: 2000,
          isClosable: false,
        });
      }
    }

    if (isError) {
      return Toast({
        title: "We're having issues connecting you to our servers",
        status: "error",
        duration: 2000,
        isClosable: false,
      });
    }

    return () => {};
  }, [Toast, data?.error, isError, isFetched]);

  return (
    <>
      <Helmet>
        {/* Main Meta Tags */}
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
          content="social, media, social media, content, audio, video, images, other"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Usocial" />
        <meta property="og:title" content="Usocial" />
        <meta
          property="og:description"
          content="Usocial is a next-gen privacy oriented social media networking platform."
        />

        {/* Twitter Meta Tags */}
        <meta property="twitter:type" content="website" />
        <meta property="twitter:locale" content="en_US" />
        <meta property="twitter:site_name" content="Usocial" />
        <meta property="twitter:title" content="Usocial" />
        <meta
          property="twitter:description"
          content="Usocial is a next-gen privacy oriented social media networking platform."
        />
      </Helmet>

      <Navbar />
      <Box>{children}</Box>
    </>
  );
};

export default PlatformLayout;
