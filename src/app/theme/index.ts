import { extendTheme, Theme } from "@chakra-ui/react";

const customTheme: Theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: true,

  fonts: {
    heading: "ubuntu bold",
    body: "ubuntu",
  },
  components: {
    Button: {
      baseStyle: {
        _focus: "",
      },
    },
    IconButton: {
      baseStyle: {
        _focus: "",
      },
    },
    CloseButton: {
      baseStyle: {
        _focus: "",
      },
    },
  },
});

export default customTheme;
