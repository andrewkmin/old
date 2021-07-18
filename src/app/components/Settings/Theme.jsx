import { useState } from "react";
import Section from "../Section";
// import axios from "../../api/axios";
import { ImSun } from "react-icons/im";
import {
  chakra,
  Flex,
  Stack,
  useColorMode,
  //  useToast
} from "@chakra-ui/react";
import { BsMoon } from "react-icons/bs";

// The section that will change the theme
const Theme = () => {
  // const toast = useToast();
  const [
    updating,
    // setUpdating
  ] = useState(false);
  const { colorMode, setColorMode } = useColorMode();

  // For updating theme prefrence on the account also
  // const handleThemeChange = async (event) => {
  //   // Starting the update
  //   setUpdating(true);
  //   // Prevent default behavior
  //   event.preventDefault();
  //   // Creating a payload
  //   const payload = {
  //     theme: {
  //       dark: colorMode === "dark",
  //       light: colorMode === "light",
  //     },
  //   };
  //   // Setting the darkmode in the backend
  //   const response = await axios.patch("/api/accounts/update", payload);
  //   // Closing all toasts
  //   toast.closeAll();
  //   // Setting the updating state to false to enable both buttons again
  //   setUpdating(false);
  //   // Checking if the request was successful
  //   switch (response.status) {
  //     case 200: {
  //       return toast({
  //         title: "Successfully updated",
  //         status: "success",
  //       });
  //     }
  //     default: {
  //       return toast({
  //         title: "Something went wrong",
  //         status: "error",
  //       });
  //     }
  //   }
  // };

  return (
    <Section title={"Theme"}>
      {/* <form onSubmit={handleThemeChange}> */}
      <Stack alignItems={"center"} justifyContent={"end"} direction={"row"}>
        <chakra.button
          p={2}
          name={"light"}
          // type={"submit"}
          value={"light"}
          color={"#272727"}
          borderRadius={"lg"}
          bgColor={"#fafafa"}
          _hover={{
            bgColor: "#E5EBEA",
          }}
          _disabled={{
            bgColor: "#E5EBEA",
            cursor: "not-allowed",
          }}
          transition={"0.2s ease-in-out"}
          onClick={() => setColorMode("light")}
          disabled={colorMode === "light" || updating}
        >
          <Flex>
            Light Theme{" "}
            <Flex ps={2} alignItems={"center"} justifyContent={"center"}>
              <ImSun />
            </Flex>
          </Flex>
        </chakra.button>

        <chakra.button
          p={2}
          name={"dark"}
          color={"white"}
          // type={"submit"}
          borderRadius={"lg"}
          bgColor={"#353535"}
          _hover={{
            bgColor: "black",
          }}
          _disabled={{
            cursor: "not-allowed",
            bgColor: "#353535",
          }}
          transition={"0.2s ease-in-out"}
          onClick={() => setColorMode("dark")}
          disabled={colorMode === "dark" || updating}
        >
          <Flex>
            Dark Theme{" "}
            <Flex ps={2} alignItems={"center"} justifyContent={"center"}>
              <BsMoon />
            </Flex>
          </Flex>
        </chakra.button>
      </Stack>
      {/* </form> */}
    </Section>
  );
};

export default Theme;
