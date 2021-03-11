import React, { createContext, FC, ReactNode, useState } from "react";
import * as THEME from "../theme/theme";
import { ThemeProvider } from "styled-components";

type Props = {
  children: ReactNode;
};

export const ToggleThemeContext = createContext<{ theme: "dark" | "light"; toggleTheme: () => void }>(undefined);

const ToggleThemeProvider: FC<Props> = (props) => {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  const toggleTheme = () => {
    setTheme((prevState) => (prevState === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeProvider theme={theme === "dark" ? THEME.dark : THEME.light}>
      <ToggleThemeContext.Provider value={{ theme, toggleTheme }}>{props.children}</ToggleThemeContext.Provider>
    </ThemeProvider>
  );
};

export default ToggleThemeProvider;
