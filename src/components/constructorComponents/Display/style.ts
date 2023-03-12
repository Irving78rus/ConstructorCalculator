import styled from "styled-components";

interface ActiveDisplayStlProps {
    isConstructorMode: boolean;
    isConstructor: boolean;
  }
 export const DisplayStl = styled.input<ActiveDisplayStlProps>`
    background: #f3f4f6;
    border-radius: 6px;
    height: 52px;
    width: 232px;
    font-size: 25px;
    font-weight: 800;
    text-align: right;
    border: none;
    padding-right: 8px;
    &:focus {
      outline: none;
    }
    ${(props) =>
      props.isConstructor &&
      `
     &:hover{
       border: 1px solid #E2E3E5;
     }
   `};
  `;
  