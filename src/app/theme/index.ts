import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  fonts: {
    heading: "Ubuntu Bold",
    body: "Ubuntu",
  },
});

export default theme;
