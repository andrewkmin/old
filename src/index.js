import "./scss/globals.scss";

import React from "react";
import App from "./app/App";
import ReactDOM from "react-dom";
import Theme from "./theme/theme";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

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
