import React, { useState } from "react";
import styled from "styled-components";
import { integral } from "../../lib";

const Integral = () => {
  const [upNum, setUpNum] = useState("");
  const [phrase, setPhrase] = useState("");
  const [bottomNum, setBottomNum] = useState("");

  const onSubmit = () => {
    integral(phrase, upNum, bottomNum);
  };

  return (
    <Wrapper>
      <IntegralSign>
        ∫
        <form onSubmit={onSubmit}>
          <Input value={upNum} onChange={(e) => setUpNum(e.target.value)} fixedWidth top={10} left={25} />
          <Input value={phrase} onChange={(e) => setPhrase(e.target.value)} top={45} left={25} />
          <Input value={bottomNum} onChange={(e) => setBottomNum(e.target.value)} fixedWidth bottom={0} left={10} />
        </form>
      </IntegralSign>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin-left: 25px;
`;

const IntegralSign = styled.span`
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

export default Integral;
