import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";

// prettier-ignore
const COLORS = [
  "#000000", "#ff7700", "#ff0000", "#797230",
  "#c800ff", "#0040ff", "#ff7700", "#00ffc4"
];

const Graph = () => {
  const [inputVal, setInputVal] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawGrid = () => {
    // TODO: dark mode colors
    const ctx = canvasRef.current.getContext("2d");
    // clear canvas
    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 0.2;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // vertical base
    ctx.moveTo(200, 0);
    ctx.lineTo(200, 400);
    // horizontal base
    ctx.moveTo(0, 200);
    ctx.lineTo(400, 200);
    ctx.stroke();

    // grid vertical
    for (let i = 0; i < 400; i += 10) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 400);
    }
    // grid horizontal
    for (let i = 0; i < 400; i += 10) {
      ctx.moveTo(0, i);
      ctx.lineTo(400, i);
    }

    ctx.stroke();
  };

  useEffect(drawGrid, []);

  const draw = () => {
    const ctx = canvasRef.current.getContext("2d");

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = COLORS[Math.floor(Math.random() * 8)];

    for (let i = 0.1; i < 25; i += 0.1) {
      const expression = inputVal.replace("x", String(i));
      const y = eval(expression);
      ctx.lineTo(200 + i * 10, 200 - y * 10);
    }
    ctx.stroke();

    ctx.beginPath();
    for (let i = 0.1; i < 25; i += 0.1) {
      const convertNegative = inputVal.replace("-x", "-1*x");
      const expression = convertNegative.replace("x", String(-i));
      const y = eval(expression);
      ctx.lineTo(200 - i * 10, 200 - y * 10);
    }

    ctx.stroke();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    draw();
    setInputVal("");
  };

  return (
    <Wrapper>
      <canvas width={400} height={400} ref={canvasRef} />
      <InputWrapper>
        <form onSubmit={onSubmit}>
          y = <Input value={inputVal} onChange={onChange} />
        </form>
        <button onClick={drawGrid}>clear</button>
      </InputWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Input = styled.input`
  height: 19px;
`;

export default Graph;
