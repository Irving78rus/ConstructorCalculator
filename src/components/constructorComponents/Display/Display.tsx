import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDigitalFromDisplay,
  deleteValue,
  deletePrevItem,
  deleteResult,
} from "../../../store/calculatorSlice";
import { stateModel } from "../../../store/types";
import { CalculatorElementWrapper } from "../../shareStyle";
import { DisplayStl } from "./style";
import { DisplayProps } from "./types";

const Display = ({ isConstructorMode, isConstructor }: DisplayProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [position, setPosition] = useState<number|null>(0);
  const displayValue = useSelector((state: stateModel) => state.calculatorSlice.digital);
  const result = useSelector((state: stateModel) => state.calculatorSlice.result);
  const showResult = useSelector((state: stateModel) => state.calculatorSlice.showResult);
   const dispatch = useDispatch();
console.log(displayValue);

  const valueHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue: string = event.target.value;
    const formattedValue: string = inputValue.replace(/[^0-9.-]/g, "");
     dispatch(addDigitalFromDisplay(formattedValue));
    setPosition(event.currentTarget.selectionStart);
  };
  const deleteValueHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (result) {
      dispatch(deleteResult());
    }
    if (position !== 0) {
      if (e.code === "Backspace") {
        dispatch(deletePrevItem(position));
      }
      if (e.code === "Delete") {
        if (inputRef.current) {
          console.log(inputRef.current);
          inputRef.current.focus();
        }
        dispatch(deleteValue());
      }
    }
    setPosition(e.currentTarget.selectionStart);
  };
 
  const valueData = () => {
    if (isConstructor) {
      return "";
    } else {
      if (!isConstructorMode) {
        if (showResult) {
          return result;
        } else {
          return displayValue.join("");
        }
      } else {
        return "";
      }
    }
  };
  return (
    <CalculatorElementWrapper height={"60px"}>
      <DisplayStl
        ref={inputRef}
        disabled={isConstructor ? true : false}
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{valueHandler(e)}}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          deleteValueHandler(e);
        }}
        value={valueData()}
        isConstructor={isConstructor}
        isConstructorMode={isConstructorMode}
      ></DisplayStl>
    </CalculatorElementWrapper>
  );
};
export default Display;
