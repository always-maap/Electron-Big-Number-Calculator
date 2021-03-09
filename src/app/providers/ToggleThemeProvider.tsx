import React, { createContext, FC, ReactNode, useState } from "react";
import * as THEME from "../theme/theme";
import { ThemeProvider } from "styled-components";

type Props = {
  children: ReactNode;
};

export const toggleThemeContext = createContext<{ theme: "dark" | "light"; toggleTheme: () => void }>(undefined);

const ToggleThemeProvider: FC<Props> = (props) => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => {
    setTheme((prevState) => (prevState === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeProvider theme={theme === "dark" ? THEME.dark : THEME.light}>
      <toggleThemeContext.Provider value={{ theme, toggleTheme }}>{props.children}</toggleThemeContext.Provider>
    </ThemeProvider>
  );
};

export default ToggleThemeProvider;
