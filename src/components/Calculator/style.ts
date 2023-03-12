import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  height: 448px;
  flex-direction: column;
  align-items: space-between;
  div {
    box-shadow: none;
  }
  gap: 20px;
  .nonempty {
    border: none;
  }
`;
export const CalculatorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 2px dashed #c4c4c4;
  border-radius: 6px;
  gap: 12px;
  width: 243px;
  height: 448px;

  &.active {
    background-color: #f0f9ff;
  }
`;
export const Text = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  color: #6b7280;
  span {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #5d5fef;
  }
`;
export const TextBlock = styled.span`
  margin-top: 70%;
  svg {
    margin-left: 50px;
  }
`;