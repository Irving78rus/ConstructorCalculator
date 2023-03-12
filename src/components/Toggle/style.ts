import styled from "styled-components";

export const ToggleWrapper = styled.div`
  display: flex;
  background: #f3f4f6;
  border-radius: 6px;
  width: 243px;
  height: 38px;
  margin-bottom: 50px;
`;
export const ToggleButton = styled.button<{ active: boolean }>`
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