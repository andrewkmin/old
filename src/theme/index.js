import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  components: {
    Button: {
      baseStyle: {
        _focus: {
          outline: "none",
        },
      },
    },
    Link: {
      baseStyle: {
        _focus: {
          outline: "none",
        },
      },
    },
    Tabs: {
      baseStyle: {
        tab: {
          _focus: {
            boxShadow: {
              outline: "none",
            },
          },
        },
      },
    },
  },
});
