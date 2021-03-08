import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle<any>`
  html {
    height: 100%;
  }

  body {
    height: 532px;
    box-sizing: border-box;
    margin: 20px;
    padding: 0;
    font-family: sans-serif;
    background-color: ${({ theme }) => theme.backgroundColor}; 
  }

  #root {
    height: 100%;
  }
`;
