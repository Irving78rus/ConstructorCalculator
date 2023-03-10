import { useDispatch} from "react-redux";
import { calculateResult } from "../../../store/calculatorSlice";
import { CalculatorElementWrapper } from '../../styledComponents';
import { EqualsButtonStyle } from "./style";
import { EqualsButtonProps } from "./types";

const EqualsButton = ({isConstructor,isConstructorMode}:EqualsButtonProps) => {
  const dispatch = useDispatch()
 
const equalsHandler=( ) => {
  if(isConstructor||isConstructorMode) return
dispatch(calculateResult(   ))
}
  return (
    <CalculatorElementWrapper height={'72px'}>
       <EqualsButtonStyle onClick={()=>{equalsHandler( )}} >=</EqualsButtonStyle>
        </CalculatorElementWrapper>
  );
};
export default EqualsButton;
