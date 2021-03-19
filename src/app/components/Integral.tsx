import React, { FormEvent, useState } from "react";
import styled from "styled-components";
import { integral } from "../../lib";

const Integral = () => {
  const [result, setResult] = useState("");
  const [upNum, setUpNum] = useState("");
  const [phrase, setPhrase] = useState("");
  const [bottomNum, setBottomNum] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult(integral(phrase, upNum, bottomNum));
  };

  return (
    <Wrapper>
      <IntegralSign>
        ∫
        <form onSubmit={onSubmit}>
          <Input value={upNum} onChange={(e) => setUpNum(e.target.value)} fixedWidth top={10} left={30} />
          <Input value={phrase} onChange={(e) => setPhrase(e.target.value)} top={45} left={25} />
          <Input value={bottomNum} onChange={(e) => setBottomNum(e.target.value)} fixedWidth bottom={0} left={15} />
          <button type={"submit"} hidden />
        </form>
      </IntegralSign>
      <Result>{result !== "" ? result : "Enter the values and press return"}</Result>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 30px 25px;
`;

const IntegralSign = styled.span`
  margin: 0 25px;
  position: relative;
  font-size: 90px;
`;

type InputProps = {
  fixedWidth?: boolean;
  top?: number;
  bottom?: number;
  left: number;
};

const Input = styled.input<InputProps>`
  width: ${({ fixedWidth }) => (fixedWidth ? "30px" : "200px")};
  position: absolute;
  top: ${({ top }) => `${top}px`};
  bottom: ${({ bottom }) => `${bottom}px`};
  left: ${({ left }) => `${left}px`};
`;

const Result = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  word-break: break-all;
  margin: 25px 0;
  height: 100%;
  width: 96%;
  background: ${({ theme }) => `linear-gradient(90deg, ${theme.textColor} 50%, transparent 50%) 0 0 repeat-x, 
    linear-gradient(90deg, ${theme.textColor} 50%, transparent 50%) 100% 100% repeat-x,
    linear-gradient(0deg, ${theme.textColor} 50%, transparent 50%) 0 100% repeat-y,
    linear-gradient(0deg, ${theme.textColor} 50%, transparent 50%) 100% 0 repeat-y;`}
  background-size: 16px 4px, 16px 4px, 4px 16px, 4px 16px;
  border-radius: 5px;
  padding: 10px;
  animation: dash 15s linear infinite;

  @keyframes dash {
    to {
      background-position: 100% 0, 0 100%, 0 0, 100% 100%;
    }
  }
`;

export default Integral;
