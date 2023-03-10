import { AssemblySlice } from "./assemblySlice";
import { CalculatorState } from "./calculatorSlice";
import { ConstructorSlice } from "./constructorSlice";


export interface stateModel {
    assemblySlice: AssemblySlice;
    calculatorSlice: CalculatorState;
    constructorSlice: ConstructorSlice;
  }