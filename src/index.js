import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import App from "./app/App";
import Theme from "./theme/theme";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      {/* This provides support for dark mode */}
      <ColorModeScript initialColorMode={Theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
