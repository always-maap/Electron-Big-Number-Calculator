import React, { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import { ToggleThemeContext } from "../providers/ToggleThemeProvider";

// prettier-ignore
const COLORS = [
  "#000000", "#ff7700", "#ff0000", "#797230",
  "#c800ff", "#0040ff", "#ff7700", "#00ffc4"
];

const Graph = () => {
  const [inputVal, setInputVal] = useState("");
  const [currentGraphs, setCurrentGraphs] = useState<{ equation: string; color: string }[]>([]);
  const [currentScale, setCurrentScale] = useState(1);
  const theme = useContext(ThemeContext);
  const themeContext = useContext(ToggleThemeContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const clearCanvas = () => {
    setCurrentGraphs([]);
    drawGrid();
  };

  useEffect(() => {
    drawGrid();
    currentGraphs.forEach((graph) => draw(graph.color, graph.equation));
  }, [themeContext.theme]);

  const drawGrid = () => {
    // TODO: dark mode colors
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();

    ctx.arc(0, 0, 1.5, 0, Math.PI * 2);
    // clear canvas
    ctx.strokeStyle = theme.GraphGridColor;
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
    drawGrid();
  }, []);

  const draw = (color: string, equation?: string) => {
    const ctx = canvasRef.current.getContext("2d");
    const thing = equation ? equation : inputVal;
    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = color;
    // positive test cases
    for (let i = 0.1; i < 25; i += 0.1) {
      const expression = thing.replace("x", String(i));
      const y = eval(expression);
      ctx.lineTo(i * 10, -y * 10);
    }
    ctx.stroke();
    ctx.closePath();
    // negative test cases
    ctx.beginPath();
    for (let i = 0.1; i < 25; i += 0.1) {
      const convertNegative = thing.replace("-x", "-1*x");
      const expression = convertNegative.replace("x", String(-i));
      const y = eval(expression);
      ctx.lineTo(-i * 10, -y * 10);
    }
    ctx.stroke();
    ctx.closePath();
  };

  const magnify = () => {
    // the idea of scaling is redrawing the graphs with scaled canvas. not the best but good for now
    const ctx = canvasRef.current.getContext("2d");
    const scale = currentScale === 1 ? 2 : currentScale === 2 ? 0.5 : 2;
    setCurrentScale(scale);
    ctx.scale(scale, scale);
    drawGrid();
    currentGraphs.forEach((graph) => draw(graph.color, graph.equation));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const color = COLORS[Math.floor(Math.random() * 8)];
    setCurrentGraphs((prevState) => [...prevState, { color, equation: inputVal }]);
    draw(color);
    setInputVal("");
  };

  return (
    <Wrapper>
      <CanvasWrapper>
        <canvas width={400} height={400} ref={canvasRef} />
        <Controllers>
          <button onClick={clearCanvas}>🧻</button>
          <button onClick={magnify}>🔎</button>
        </Controllers>
      </CanvasWrapper>
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

const Controllers = styled.div`
  position: absolute;
  top: 0;
  right: -33px;
  display: flex;
  flex-direction: column;
`;

const CanvasWrapper = styled.div`
  position: relative;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Input = styled.input`
  height: 19px;
  background-color: transparent;
`;

export default Graph;
