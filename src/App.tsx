import { useState } from "react";
import styled from "styled-components";
import Calculator from "./components/Calculator";
import Toggle from "./components/calculatorComponents/Toggle";
import Constructor from "./components/Constructor";
import DigitalButtons from "./components/constructorComponents/DigitalButtons/DigitalButtons";
import Display from "./components/constructorComponents/Display/Display";
import EqualsButton from "./components/constructorComponents/EqualsButton";
import OperatorsButton from "./components/constructorComponents/OperatorsButton";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  align-items: center;
  justify-content: flex-end;
  gap: 30px;
  height: 100%;
`;
const AppWrapper2 = styled.div`
  display: flex;
  gap: 30px;
`;
const ConstructorWrapper = styled.div<{ children: any }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 240px;
  height: 448px;
  gap: 12px;
`;
const App: React.FC = () => {
  const [currentItems, setСurrentItems] = useState(null);
  const [arrForRender, setarrForRender] = useState<any>([]);
  const [isConstructorMode, setIsConstructorMode] = useState(true);
  const [constructorElems, setConstructorElems] = useState([
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
      <Toggle isConstructorMode={isConstructorMode} setIsConstructorMode={setIsConstructorMode} />
      <AppWrapper2>
        <Constructor 
        constructorElems={constructorElems}
        currentItems={currentItems}
        setСurrentItems={setСurrentItems}
        arrForRender={arrForRender}
        isConstructorMode={isConstructorMode}
        />
        

        <Calculator
          isConstructorMode={isConstructorMode}
          constructorElems={constructorElems}
          setConstructorElems={setConstructorElems}
          currentItems={currentItems}
          setСurrentItems={setСurrentItems}
          arrForRender={arrForRender}
          setarrForRender={setarrForRender}
        />
      </AppWrapper2>
    </AppWrapper>
  );
};

export default App;
