import { ConstructorBlock } from "../../App";

export interface CalculatorProps {
    isConstructorMode: boolean;
    usedElements: ConstructorBlock[] | [];
    setUsedElements: (usedElements: ConstructorBlock[] | []) => void;
    currentItems: number | null;
    arrForRender: ConstructorBlock[] | [];
    setArrForRender: (arrForRender: any) => void;
  }
  