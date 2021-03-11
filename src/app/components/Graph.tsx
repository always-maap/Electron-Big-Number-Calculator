import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Graph = () => {
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
    // TODO: work with user input & fix distance from y axis
    ctx.moveTo(200, 200);
    for (let i = 0; i < 25; i++) {
      const y = Math.pow(Math.sin(i), 2) + Math.pow(Math.cos(i), 2);
      ctx.lineTo(200 + i * 10, 200 - y * 10);
    }
    ctx.stroke();

    ctx.moveTo(200, 200);
    for (let i = 0; i < 100; i++) {
      const y = Math.pow(Math.sin(-i), 2) + Math.pow(Math.cos(-i), 2);
      ctx.lineTo(200 - i * 10, 200 - y * 10);
    }

    ctx.stroke();
  };

  return (
    <Wrapper>
      <canvas width={400} height={400} ref={canvasRef} />
      y = <input /> <button onClick={draw}>draw</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Graph;
