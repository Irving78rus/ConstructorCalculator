import { useDispatch} from "react-redux";
import { addOperator} from "../../../store/calculatorSlice";
import { CalculatorElementWrapper, OperatorsButtonStyled } from "../../styledComponents";
import { OperatorsButtonProps } from "./types";

const OperatorsButton = ({ isConstructor, isConstructorMode, disabled }: OperatorsButtonProps) => {
  const operators = ["/", "X", "-", "+"];
  const dispatch = useDispatch()

  const operatorHandler = (operator: string) => {
    if (isConstructor || isConstructorMode) return
    dispatch(addOperator(operator))
  }

  return (
    <CalculatorElementWrapper height={"56px"}>
      {operators.map((operator: string) => (
        <OperatorsButtonStyled 
        id={"test"}
        isConstructor={isConstructor}
          disabled={disabled}
          isConstructorMode={isConstructorMode} onClick={() => { operatorHandler(operator) }}
          key={operator} width={"52px"} height={"48px"}
        >
          {operator}
        </OperatorsButtonStyled>
      ))}
    </CalculatorElementWrapper>
  );
};
export default OperatorsButton;
