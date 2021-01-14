import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { HelmetProvider } from "react-helmet-async";

import "./styles/index.scss";
import App from "./app/App";

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
