import Section from "../Section";
import axios from "../../api/axios";
import {
  Box,
  Center,
  chakra,
  Spinner,
  Stack,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

// The section that will change the theme
const Theme = () => {
  const toast = useToast();
  const [updating, setUpdating] = useState(false);
  const { colorMode, setColorMode } = useColorMode();

  // For updating theme prefrence on the account also
  const handleThemeChange = async (event) => {
    // Starting the update
    setUpdating(true);
    // Prevent default behavior
    event.preventDefault();
    // Creating a payload
    const payload = {
      theme: {
        dark: colorMode === "dark",
        light: colorMode === "light",
      },
    };
    // Setting the darkmode in the backend
    const response = await axios.patch("/api/accounts/update", payload);
    // Closing all toasts
    toast.closeAll();
    // Setting the updating state to false to enable both buttons again
    setUpdating(false);
    // Checking if the request was successful
    switch (response.status) {
      case 200: {
        return toast({
          title: "Successfully updated",
          status: "success",
        });
      }
      default: {
        return toast({
          title: "Something went wrong",
          status: "error",
        });
      }
    }
  };

  return (
    <Section title={"Theme"} subtitle={"Choose the best theme that you like"}>
      <form onSubmit={handleThemeChange}>
        <Stack direction={"row"}>
          <chakra.button
            p={2}
            w={"full"}
            name={"light"}
            type={"submit"}
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
            onClick={(event) => setColorMode("light")}
            disabled={colorMode === "light" || updating}
          >
            Light Theme
          </chakra.button>

          <chakra.button
            p={2}
            w={"full"}
            name={"dark"}
            color={"white"}
            type={"submit"}
            borderRadius={"lg"}
            bgColor={"#353535"}
            _hover={{
              bgColor: "black",
            }}
            _disabled={{
              cursor: "not-allowed",
              bgColor: "#353535",
            }}
            onClick={(event) => setColorMode("dark")}
            disabled={colorMode === "dark" || updating}
          >
            Dark theme
          </chakra.button>
        </Stack>
      </form>
    </Section>
  );
};

export default Theme;
