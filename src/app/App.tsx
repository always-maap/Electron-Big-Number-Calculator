import React, { createContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./theme/globalStyles";
import * as THEME from "./theme/theme";
import Calculator from "./components/Calculator";

export const toggleThemeContext = createContext<{ theme: "dark" | "light"; toggleTheme: () => void }>(undefined);

const App = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => {
    setTheme((prevState) => (prevState === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeProvider theme={theme === "dark" ? THEME.dark : THEME.light}>
      <toggleThemeContext.Provider value={{ theme, toggleTheme }}>
        <GlobalStyles />
        <Calculator />
      </toggleThemeContext.Provider>
    </ThemeProvider>
  );
};

export default App;
