import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Graph = () => {
  const [inputVal, setInputVal] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
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
    ctx.lineWidth = 0.2;
    ctx.stroke();
  }, []);

  const draw = () => {
    const ctx = canvasRef.current.getContext("2d");

    ctx.beginPath();
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = "#ff0000";
    // TODO: work with user input

    for (let i = 0; i < 25; i++) {
      const y = Math.pow(i - 1, 2) - 2;
      ctx.lineTo(200 + i * 10, 200 - y * 10);
    }
    ctx.stroke();

    ctx.beginPath();
    for (let i = 0; i < 25; i++) {
      const y = Math.pow(-i - 1, 2) - 2;
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
