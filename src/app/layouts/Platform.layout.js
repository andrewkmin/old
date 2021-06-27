import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
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
      <Box>
        <Navbar />
        <Box>{children}</Box>
      </Box>
    </>
  );
};

export default PlatformLayout;
