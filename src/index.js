import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";

import App from "./App";

const themes = {
  light: {
    foreground: "#000000",
    background: "red",
  },
  dark: {
    foreground: "#ffffff",
    background: "green",
  },
  grays: {
    0: "#ffffff",
    5: "#f6f6f6",
    10: "#f2f2f2",
    20: "#e5e5e5",
    30: "#dddddd",
    40: "#bbbbbb",
    50: "#999999",
    80: "#666666",
    90: "#666666",
    100: "#000000",
  },
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={themes}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
