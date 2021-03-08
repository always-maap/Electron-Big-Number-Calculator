import React, { ChangeEvent, FC, useContext } from "react";
import styled from "styled-components";
import { toggleThemeContext } from "../App";

type Props = {
  inputVal: string;
  onchange(e: ChangeEvent<HTMLTextAreaElement>): void;
};

const CalculatorMonitor: FC<Props> = (props) => {
  const context = useContext(toggleThemeContext);
  return (
    <>
      <TextArea inputVal={props.inputVal} placeholder="0" value={props.inputVal} onChange={props.onchange} />
      <ToggleTheme onClick={context}>toggle</ToggleTheme>
    </>
  );
};

type TextAreaProps = {
  inputVal: string;
};

const TextArea = styled.textarea<TextAreaProps>`
  position: relative;
  background-color: transparent;
  word-break: break-word;
  border: none;
  height: 100%;
  width: 100%;
  font-size: ${({ inputVal }) => (inputVal.length < 10 ? "32px" : inputVal.length < 20 ? "26px" : "16px")};
  color: ${({ theme }) => theme.buttonsTextColor};
  resize: none;
`;

const ToggleTheme = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
`;

export default CalculatorMonitor;
