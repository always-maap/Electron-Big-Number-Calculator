import React, { FC } from "react";
import { Button } from "./Button";
import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { ToggleThemeContext } from "../providers/ToggleThemeProvider";

type Props = {
  onClick(val: string): void;
};

const CalculatorButtons: FC<Props> = (props) => {
  const themeContext = useContext(ToggleThemeContext);
  const theme = useContext(ThemeContext);

  const buttons = [
    { value: "C", backgroundColor: theme.clearButtonBackgroundColor, textColor: theme.clearButtonTextColor },
    { value: "(" },
    { value: ")" },
    { value: "/", backgroundColor: theme.operationsButtonBackgroundColor, textColor: theme.operationsButtonTextColor },
    { value: "1" },
    { value: "2" },
    { value: "3" },
    { value: "*", backgroundColor: theme.operationsButtonBackgroundColor, textColor: theme.operationsButtonTextColor },
    { value: "4" },
    { value: "5" },
    { value: "6" },
    { value: "-", backgroundColor: theme.operationsButtonBackgroundColor, textColor: theme.operationsButtonTextColor },
    { value: "7" },
    { value: "8" },
    { value: "9" },
    { value: "+", backgroundColor: theme.operationsButtonBackgroundColor, textColor: theme.operationsButtonTextColor },
    { value: `${themeContext.theme === "dark" ? "☀️" : "🌙"}`, backgroundColor: theme.toggleThemeButtonBackgroundColor },
    { value: "0" },
    { value: "🧮", backgroundColor: theme.advancedButtonBackgroundColor },
    { value: "=", backgroundColor: theme.equalButtonBackgroundColor, textColor: theme.operationsButtonTextColor },
  ];

  return (
    <Wrapper>
      {buttons.map((button) => (
        <Button
          key={button.value}
          textColor={button.textColor}
          backgroundColor={button.backgroundColor}
          onClick={() => props.onClick(button.value)}
        >
          {button.value}
        </Button>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

export default CalculatorButtons;
