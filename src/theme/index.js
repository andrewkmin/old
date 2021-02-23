import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  components: {
    Button: {
      baseStyle: {
        _focus: false,
      },
    },
    Link: {
      baseStyle: {
        _focus: false,
      },
    },
  },
});
