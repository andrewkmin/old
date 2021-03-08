import "./scss/globals.scss";

import React from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import App from "./app/index";
import Theme from "./theme/index";

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              refetchOnWindowFocus: false,
              refetchIntervalInBackground: true,
            },
          },
        })
      }
    >
      <HelmetProvider>
        <ChakraProvider theme={Theme}>
          {/* This provides support for dark mode */}
          <ColorModeScript initialColorMode={Theme.config.initialColorMode} />
          <App />
        </ChakraProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
