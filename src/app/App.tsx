import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./theme/globalStyles";
import * as THEME from "./theme/theme";
import Calculator from "./components/Calculator";

const App = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  return (
    <ThemeProvider theme={theme === "dark" ? THEME.dark : THEME.light}>
      <GlobalStyles />
      <Calculator />
    </ThemeProvider>
  );
};

export default App;
