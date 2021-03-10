import React, { ChangeEvent, useContext, useState } from "react";
import CalculatorMonitor from "./CalculatorMonitor";
import CalculatorButtons from "./CalulatorButtons";
import styled from "styled-components";
import { phraseAnalysis } from "../../lib";
import { ToggleThemeContext } from "../providers/ToggleThemeProvider";
import { ToggleIsAdvancedContext } from "../providers/ToggleAdvancedProvider";
import AdvancedCalculator from "./AdvancedCalculator";

const Calculator = () => {
  const [inputVal, setInputVal] = useState("");
  const themeContext = useContext(ToggleThemeContext);
  const advancedContext = useContext(ToggleIsAdvancedContext);

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
      case "🧮": {
        advancedContext.toggleIsAdvanced();
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
      {advancedContext.isAdvanced ? (
        <AdvancedCalculator />
      ) : (
        <>
          <MonitorWrapper>
            <CalculatorMonitor inputVal={inputVal} onchange={onchange} />
          </MonitorWrapper>
          <CalculatorButtons onClick={onClick} />
        </>
      )}
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
