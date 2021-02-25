import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  components: {
    Button: {
      baseStyle: {
        _focus: null,
      },
    },
    Link: {
      baseStyle: {
        _focus: null,
      },
    },
    Tabs: {
      baseStyle: {
        tab: {
          _focus: null,
        },
      },
    },
  },
});
