import React from "react";
import { GlobalStyles } from "./theme/globalStyles";
import Calculator from "./components/Calculator";
import ToggleThemeProvider from "./providers/ToggleThemeProvider";
import ToggleAdvancedProvider from "./providers/ToggleAdvancedProvider";

const App = () => {
  return (
    <ToggleThemeProvider>
      <GlobalStyles />
      <ToggleAdvancedProvider>
        <Calculator />
      </ToggleAdvancedProvider>
    </ToggleThemeProvider>
  );
};

export default App;
