import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Arrow from "../../icon/Arrow";
import Eye from "../../icon/Eye";
import {
  addDigital,
  addDigitalFromDisplay,
  deleteResult,
  deleteValue,
} from "../../store/calculatorSlice";
const ToggleWrapper = styled.div`
  display: flex;
  background: #f3f4f6;
  border-radius: 6px;
  width: 243px;
  height: 38px;
  margin-bottom: 50px;
`;
const ToggleButton = styled.button<{ active: boolean }>`
  background: transparent;
  border-radius: 6px;
  width: 50%;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  ${(props) =>
    props.active &&
    `
  background: #ffffff;
  margin:1px;
  border: 1px solid #E2E3E5;
  border-radius: 5px;
  fill:#5D5FEF;
  `}
  &:hover {
    cursor: pointer;
  }
`;
const Toggle = ({ isConstructorMode, setIsConstructorMode }: any) => {
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
