import styled from "styled-components";
interface CalculatorElementWrapperProps {
  height: string;
}
export const CalculatorElementWrapper = styled.div<CalculatorElementWrapperProps>`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 240px;
  height: ${(props) => props.height || "0"};
  background: #ffffff;
  padding: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;
interface OperatorsButtonStyledProps {
  width: string;
  height: string;
  isConstructorMode:boolean;
  isConstructor:boolean;
}
export const OperatorsButtonStyled = styled.button<OperatorsButtonStyledProps>`
    
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width || "0"}; 
  height: ${(props) => props.height || "0"}; 
  background: #ffffff;
  border: 1px solid #E2E3E5;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  ${(props) =>
    props.isConstructorMode?`
    &:hover{
     
      cursor: move;
    }
  `:
    `
    &:hover{
      border: 2px solid #5D5FEF;
      border-radius: 6px;
      cursor: pointer;
    }
  `};
  ${(props) =>
     props.isConstructor &&
    `
    &:hover{

      border: 1px solid #E2E3E5;
      cursor: move;
    }
  `}
 
`;
