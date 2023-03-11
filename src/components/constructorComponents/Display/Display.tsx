import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDigitalFromDisplay,
  deleteValue,
  deletePrevItem,
  deleteResult,
} from "../../../store/calculatorSlice";
import { stateModel } from "../../../store/types";
import { CalculatorElementWrapper } from "../../styledComponents";
import { DisplayStl } from "./style";
import { DisplayProps } from "./types";

const Display = ({ isConstructorMode, isConstructor }: DisplayProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [position, setPosition] = useState<number>(0);
  const displayValue = useSelector((state: stateModel) => state.calculatorSlice.digital);
  const result = useSelector((state: stateModel) => state.calculatorSlice.result);
  const showResult = useSelector((state: stateModel) => state.calculatorSlice.showResult);
  const calculatorSlice = useSelector((state: stateModel) => state.calculatorSlice);
  const dispatch = useDispatch();

     
  
  const valueHandler = (event: any) => {
    dispatch(addDigitalFromDisplay(event.target.value));
    setPosition(event.currentTarget.selectionStart);
     
  };
  const deleteValueHandler = (e: any) => {
    if(result){
      dispatch(deleteResult());
    }
if(position!==0){
  if (e.code === "Backspace") {
    dispatch(deletePrevItem(position));
  }
  if (e.code === "Delete") {
    if (inputRef.current) { 
      console.log(inputRef.current);
       inputRef.current.focus()
      }
  
    dispatch(deleteValue());
  }
  
}
setPosition(e.currentTarget.selectionStart);
   
    
  };
 
console.log(calculatorSlice);

  console.log(position,'position');
  return (
    <CalculatorElementWrapper height={"60px"}>
      <DisplayStl
    ref={inputRef}
        disabled={isConstructor ? true : false}
        onChange={valueHandler}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          deleteValueHandler(e);
        }}
         
        value={
          isConstructor
            ? ""
            : !isConstructorMode
            ? showResult
              ? result
              : displayValue.join("")
            : ""
        }
        isConstructor={isConstructor}
        isConstructorMode={isConstructorMode}
      ></DisplayStl>
    </CalculatorElementWrapper>
  );
};
export default Display;
