import { useDispatch} from "react-redux";
import { addDigital } from "../../../store/calculatorSlice";
import { CalculatorElementWrapper, OperatorsButtonStyled } from "../../styledComponents";
import { DigitalButtonsProps } from "./types";



const DigitalButtons = ({ isConstructor, isConstructorMode,disabled }: DigitalButtonsProps) => {
  const buttonsValue: (string | number)[] = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."];
  const dispatch = useDispatch()

  const digitalHandler = (digital: string | number) => {
    if (isConstructor || isConstructorMode) return
    dispatch(addDigital(digital))
  }
  return (
    <CalculatorElementWrapper height={"224px"}>
      {buttonsValue.map((digital:string | number) => (
        <OperatorsButtonStyled
          key={digital}
          width={digital === 0 ? "152px" : "72px"}
          height={"48px"}
          onClick={() => { digitalHandler(digital) }}
          isConstructorMode={isConstructorMode}
          isConstructor={isConstructor}
          disabled={disabled}
        >
          {digital}
        </OperatorsButtonStyled>
      ))}
    </CalculatorElementWrapper>
  );
};
export default DigitalButtons;
