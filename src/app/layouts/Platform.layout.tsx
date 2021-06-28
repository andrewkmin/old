import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { useToast } from "@chakra-ui/toast";
import { useSendHeartbeat } from "../api/hooks";

const PlatformLayout: React.FC = ({ children }) => {
  const toast = useToast();
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
    <>
      <Box>
        <Navbar />
        <Box pb={10}>{children}</Box>
      </Box>
    </>
  );
};

export default PlatformLayout;
