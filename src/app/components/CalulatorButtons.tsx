import React, { FC } from "react";
import { Button } from "./Button";
import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

type Props = {
  onClick(val: string): void;
};

const CalculatorButtons: FC<Props> = (props) => {
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
    { value: "0", gridColumn: "span 3" },
    { value: "=", backgroundColor: theme.equalButtonBackgroundColor, textColor: theme.operationsButtonTextColor },
  ];

  return (
    <Wrapper>
      {buttons.map((button) => (
        <Button
          key={button.value}
          textColor={button.textColor}
          backgroundColor={button.backgroundColor}
          style={{ gridColumn: button.gridColumn }}
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
