import React, { ChangeEvent, useContext, useState } from "react";
import CalculatorMonitor from "./CalculatorMonitor";
import CalculatorButtons from "./CalulatorButtons";
import styled from "styled-components";
import { phraseAnalysis } from "../../lib";
import { toggleThemeContext } from "../App";

const Calculator = () => {
  const [inputVal, setInputVal] = useState("");
  const themeContext = useContext(toggleThemeContext);

  const onResult = () => {
    setInputVal(phraseAnalysis(inputVal));
  };

  const onchange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputVal(e.target.value);
  };

  const onClear = () => {
    setInputVal("");
  };

  const onClick = (val: string) => {
    switch (val) {
      case "C": {
        onClear();
        break;
      }
      case "=": {
        onResult();
        break;
      }
      case "☀️":
      case "🌙": {
        themeContext.toggleTheme();
        break;
      }
      default: {
        setInputVal((prevState) => prevState + val);
        break;
      }
    }
  };

  return (
    <Wrapper>
      <MonitorWrapper>
        <CalculatorMonitor inputVal={inputVal} onchange={onchange} />
      </MonitorWrapper>
      <CalculatorButtons onClick={onClick} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const MonitorWrapper = styled.div`
  padding-bottom: 25px;
  flex-grow: 1;
`;

export default Calculator;
