import "./styles/index.scss";

import React from "react";
import ReactDOM from "react-dom";

import App from "./app/App";

import { ChakraProvider } from "@chakra-ui/react";
import { HelmetProvider } from "react-helmet-async";

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
