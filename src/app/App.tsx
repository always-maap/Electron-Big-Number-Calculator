import React from "react";
import { GlobalStyles } from "./theme/globalStyles";
import Calculator from "./components/Calculator";
import ToggleThemeProvider from "./providers/ToggleThemeProvider";

const App = () => {
  return (
    <ToggleThemeProvider>
      <GlobalStyles />
      <Calculator />
    </ToggleThemeProvider>
  );
};

export default App;
