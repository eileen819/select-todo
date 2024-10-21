import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { RecoilRoot } from "recoil";
import { theme } from "./theme";
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </RecoilRoot>
    </HelmetProvider>
  </React.StrictMode>
);
