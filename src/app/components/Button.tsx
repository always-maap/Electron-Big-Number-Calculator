import React from "react";
import styled from "styled-components";

type Props = {
  width?: string;
  backgroundColor?: string;
  textColor?: string;
};

export const Button = styled.button<Props>`
  width: ${({ width }) => width || "100%"};
  background-color: ${({ theme, backgroundColor }) => backgroundColor || theme.buttonsBackgroundColor};
  color: ${({ textColor }) => textColor || "white"};
  font-size: 24px;
  height: 55px;
  border-radius: 25px;
  border: none;
  outline: none;
`;
