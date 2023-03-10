import { useSelector } from "react-redux";
import { stateModel } from "../../../store/types";
import { CalculatorElementWrapper } from "../../styledComponents";
import { DisplayStl } from "./style";
import { DisplayProps } from "./types";

const Display = ({ isConstructorMode, isConstructor  }: DisplayProps) => {
  const displayValue = useSelector((state: stateModel) => state.calculatorSlice.digital);
  const result = useSelector((state: stateModel) => state.calculatorSlice.result);
  const showResult = useSelector((state: stateModel) => state.calculatorSlice.showResult);
  console.log(displayValue);

  return (
    <CalculatorElementWrapper height={"60px"}>
      <DisplayStl
        disabled={isConstructor ? true : false}
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
