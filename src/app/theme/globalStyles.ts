import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    height: 532px;
    box-sizing: border-box;
    margin: 20px;
    padding: 0;
    font-family: sans-serif;
  }

  #root {
    height: 100%;
  }
`;
