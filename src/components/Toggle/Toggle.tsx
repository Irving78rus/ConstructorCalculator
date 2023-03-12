import { useDispatch } from "react-redux";
import Arrow from "../../icon/Arrow";
import Eye from "../../icon/Eye";
import { deleteResult, deleteValue } from "../../store/calculatorSlice";
import { ToggleButton, ToggleWrapper } from "./style";
import { ToggleProps } from "./types";

const Toggle = ({ isConstructorMode, setIsConstructorMode }: ToggleProps) => {
  const dispatch = useDispatch();
  const turnOnCalculatorMode = () => {
    setIsConstructorMode(false);
    dispatch(deleteValue());
    dispatch(deleteResult());
  };
  const turnOnConstructorMode = () => {
    setIsConstructorMode(true);
  };

  return (
    <div>
      <ToggleWrapper>
        <ToggleButton active={!isConstructorMode} onClick={turnOnCalculatorMode}>
          <Eye fill={!isConstructorMode ? "#5D5FEF" : "#BDBDBD"}></Eye> <span>Runtime </span>
        </ToggleButton>
        <ToggleButton active={isConstructorMode} onClick={turnOnConstructorMode}>
          <Arrow fill={isConstructorMode ? "#5D5FEF" : "#BDBDBD"}></Arrow> <span>Constructor </span>
        </ToggleButton>
      </ToggleWrapper>
    </div>
  );
};
export default Toggle;
