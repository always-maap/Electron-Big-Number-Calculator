import React, { createContext, FC, ReactNode, useState } from "react";
import * as THEME from "../theme/theme";
import { ThemeProvider } from "styled-components";

type Props = {
  children: ReactNode;
};

type ThemeType = "dark" | "light";

export const ToggleThemeContext = createContext<{ theme: "dark" | "light"; toggleTheme: () => void }>(undefined);

const ToggleThemeProvider: FC<Props> = (props) => {
  const [theme, setTheme] = useState<ThemeType>(() => (window.localStorage.getItem("theme") as ThemeType) || "light");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    window.localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeProvider theme={theme === "dark" ? THEME.dark : THEME.light}>
      <ToggleThemeContext.Provider value={{ theme, toggleTheme }}>{props.children}</ToggleThemeContext.Provider>
    </ThemeProvider>
  );
};

export default ToggleThemeProvider;
