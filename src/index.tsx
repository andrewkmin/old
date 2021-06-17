import App from "./app";
import React from "react";
import "./css/globals.css";
import Theme from "./app/theme";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: true,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
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
