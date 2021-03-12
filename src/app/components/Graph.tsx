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
    ctx.beginPath();

    ctx.arc(0, 0, 1.5, 0, Math.PI * 2);
    // clear canvas
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 0.2;
    ctx.clearRect(-200, -200, canvasRef.current.width, canvasRef.current.height);
    // vertical base
    ctx.moveTo(0, -200);
    ctx.lineTo(0, 200);
    // horizontal base
    ctx.moveTo(-200, 0);
    ctx.lineTo(200, 0);
    ctx.stroke();

    // grid vertical
    for (let i = -200; i <= 200; i += 10) {
      ctx.moveTo(i, -200);
      ctx.lineTo(i, 200);
    }
    // grid horizontal
    for (let i = -200; i <= 200; i += 10) {
      ctx.moveTo(-200, i);
      ctx.lineTo(200, i);
    }

    ctx.stroke();
    ctx.closePath();
  };

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.translate(200, 200);
    ctx.scale(2, 2);
    drawGrid();
  }, []);

  const draw = () => {
    const ctx = canvasRef.current.getContext("2d");

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = COLORS[Math.floor(Math.random() * 8)];
    // positive test cases
    for (let i = 0.1; i < 25; i += 0.1) {
      const expression = inputVal.replace("x", String(i));
      const y = eval(expression);
      ctx.lineTo(i * 10, -y * 10);
    }
    ctx.stroke();
    ctx.closePath();
    // negative test cases
    ctx.beginPath();
    for (let i = 0.1; i < 25; i += 0.1) {
      const convertNegative = inputVal.replace("-x", "-1*x");
      const expression = convertNegative.replace("x", String(-i));
      const y = eval(expression);
      ctx.lineTo(-i * 10, -y * 10);
    }
    ctx.stroke();
    ctx.closePath();
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
