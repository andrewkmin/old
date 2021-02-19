import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
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

export default theme;
