import React from "react";
import styled from "styled-components";

const Integral = () => {
  return (
    <Wrapper>
      <IntegralSign>
        ∫
        <Input fixedWidth top={10} left={25} />
        <Input top={45} left={25} />
        <Input fixedWidth bottom={0} left={10} />
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
