import React, { useContext, useState } from "react";
import { ToggleIsAdvancedContext } from "../providers/ToggleAdvancedProvider";
import styled, { ThemeContext } from "styled-components";
import { Button } from "./Button";
import Integral from "./Integral";
import Graph from "./Graph";

const AdvancedCalculator = () => {
  const theme = useContext(ThemeContext);
  const [currentTab, setCurrentTab] = useState<"integral" | "graph">("integral");
  const advancedContext = useContext(ToggleIsAdvancedContext);

  return (
    <Wrapper>
      {currentTab === "integral" ? <Integral /> : <Graph />}
      <Controllers>
        <Button onClick={() => setCurrentTab("integral")}>∫</Button>
        <Button onClick={() => setCurrentTab("graph")}>📊</Button>
        <Button backgroundColor={theme.advancedButtonBackgroundColor} onClick={advancedContext.toggleIsAdvanced}>
          🧮
        </Button>
      </Controllers>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const Controllers = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

export default AdvancedCalculator;
