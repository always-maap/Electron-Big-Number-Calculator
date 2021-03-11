import React, { useContext } from "react";
import { ToggleThemeContext } from "../providers/ToggleThemeProvider";
import { ThemeContext } from "styled-components";
import { Button } from "./Button";

const ToggleThemeButton = () => {
  const themeContext = useContext(ToggleThemeContext);
  const theme = useContext(ThemeContext);

  return (
    <Button onClick={themeContext.toggleTheme} backgroundColor={theme.toggleThemeButtonBackgroundColor}>
      {themeContext.theme === "dark" ? "☀️" : "🌙"}
    </Button>
  );
};

export default ToggleThemeButton;
