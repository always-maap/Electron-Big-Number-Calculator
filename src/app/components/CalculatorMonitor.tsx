import React, { ChangeEvent, FC } from "react";
import styled from "styled-components";

type Props = {
  inputVal: string;
  onchange(e: ChangeEvent<HTMLTextAreaElement>): void;
};

const CalculatorMonitor: FC<Props> = (props) => {
  return <TextArea inputVal={props.inputVal} placeholder="0" value={props.inputVal} onChange={props.onchange} />;
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
  resize: none;
`;

export default CalculatorMonitor;
