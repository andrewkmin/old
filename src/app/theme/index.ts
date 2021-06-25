import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  fonts: {
    heading: "Ubuntu Bold",
    body: "Ubuntu",
  },
  components: {
    Button: {
      baseStyle: {
        _focus: "none",
      },
    },
    Link: {
      baseStyle: {
        _focus: "none",
      },
    },
    Tabs: {
      baseStyle: {
        tab: {
          _focus: "none",
        },
      },
    },
  },
});

export default theme;
