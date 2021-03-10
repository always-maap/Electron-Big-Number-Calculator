import React, { createContext, FC, ReactNode, useState } from "react";
import { ipcRenderer } from "electron";

type Props = {
  children: ReactNode;
};

export const ToggleIsAdvancedContext = createContext<{ isAdvanced: boolean; toggleIsAdvanced: () => void }>({
  isAdvanced: false,
  toggleIsAdvanced: () => {},
});

const ToggleAdvancedProvider: FC<Props> = (props) => {
  const [isAdvanced, setIsAdvanced] = useState(false);

  const toggleIsAdvanced = () => {
    ipcRenderer.send("resizeWindow", isAdvanced);
    setIsAdvanced(!isAdvanced);
  };

  return (
    <ToggleIsAdvancedContext.Provider value={{ isAdvanced, toggleIsAdvanced }}>
      {props.children}
    </ToggleIsAdvancedContext.Provider>
  );
};

export default ToggleAdvancedProvider;
