import React, { ChangeEvent, useState } from "react";
import CalculatorMonitor from "./CalculatorMonitor";
import CalculatorButtons from "./CalulatorButtons";
import styled from "styled-components";
import { add } from "../../lib";

const Calculator = () => {
  const [inputVal, setInputVal] = useState("");

  const onResult = () => {
    onClear();
    const inp = inputVal.replace(/\s/g, "");
    const t = inp.split("+");
    setInputVal(add(t[0], t[1]));
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
