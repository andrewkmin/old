import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
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
