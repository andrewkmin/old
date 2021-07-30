import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useToast } from "@chakra-ui/toast";
import { useSendHeartbeat } from "../api/hooks";
import { Box, useColorModeValue } from "@chakra-ui/react";

const PlatformLayout: React.FC = ({ children }) => {
  const toast = useToast({ position: "bottom-left" });
  const { data, isError, isFetched } = useSendHeartbeat();

  useEffect(() => {
    if (isFetched)
      if (data?.error)
        toast({
          title: "We're having issues connecting you to our servers",
          status: "error",
          duration: 2000,
          isClosable: false,
        });

    if (isError)
      toast({
        title: "We're having issues connecting you to our servers",
        status: "error",
        duration: 2000,
        isClosable: false,
      });

    return () => {};
  }, [data?.error, isError, isFetched, toast]);

  return (
    <Box bgColor={useColorModeValue("gray.200", "gray.800")} minH={"100vh"}>
      <Navbar />
      <Box>{children}</Box>
    </Box>
  );
};

export default PlatformLayout;
