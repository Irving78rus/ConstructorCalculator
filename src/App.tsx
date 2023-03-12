import { useState } from "react";
import styled from "styled-components";
import Calculator from "./components/Calculator/Calculator";
import Toggle from "./components/Toggle/Toggle";
import Constructor from "./components/Constructor/Constructor";
import DigitalButtons from "./components/constructorComponents/DigitalButtons/DigitalButtons";
import Display from "./components/constructorComponents/Display/Display";
import EqualsButton from "./components/constructorComponents/EqualsButton/EqualsButton";
import OperatorsButton from "./components/constructorComponents/OperatorsButton/OperatorsButton";
import { OperatorsButtonProps } from "./components/constructorComponents/OperatorsButton/types";

const AppWrapper = styled.div`
  display: flex;
  margin-top: 30px;
  align-items: flex-end;
  justify-content: center;
  gap: 60px;
  height: 100%;
`;
const AppWrapper2 = styled.div`
  gap: 30px;
`;

export interface ConstructorBlock {
  id: number;
  elem: ({ isConstructor, isConstructorMode, disabled }: OperatorsButtonProps) => JSX.Element;
  use: boolean;
}

const App: React.FC = () => {
  const [currentItems, setCurrentItems] = useState<null | number>(null);
  const [arrForRender, setArrForRender] = useState<ConstructorBlock[] | []>([]);
  const [isConstructorMode, setIsConstructorMode] = useState(true);
  const [usedElements, setUsedElements] = useState<ConstructorBlock[]>([
    {
      id: 1,
      elem: Display,
      use: false,
    },
    {
      id: 2,
      elem: OperatorsButton,
      use: false,
    },
    {
      id: 3,
      elem: DigitalButtons,
      use: false,
    },
    {
      id: 4,
      elem: EqualsButton,
      use: false,
    },
  ]);

  return (
    <AppWrapper>
      <Constructor
        usedElements={usedElements}
        currentItems={currentItems}
        setCurrentItems={setCurrentItems}
        arrForRender={arrForRender}
        isConstructorMode={isConstructorMode}
      />

      <AppWrapper2>
        <Toggle isConstructorMode={isConstructorMode} setIsConstructorMode={setIsConstructorMode} />

        <Calculator
          isConstructorMode={isConstructorMode}
          usedElements={usedElements}
          setUsedElements={setUsedElements}
          currentItems={currentItems}
          arrForRender={arrForRender}
          setArrForRender={setArrForRender}
        />
      </AppWrapper2>
    </AppWrapper>
  );
};

export default App;
