import React, { useState } from "react";
import styled from "styled-components";
import DigitalButtons from "./constructorComponents/DigitalButtons/DigitalButtons";
import Dispaly from "./constructorComponents/Display/Display";
import EqualsButton from "./constructorComponents/EqualsButton/EqualsButton";
import OperatorsButton from "./constructorComponents/OperatorsButton/OperatorsButton";
const ConstructorWrapper = styled.div<{ children: any }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 240px;
  height: 448px;
  gap: 12px;
`;

const Constructor = ({ setСurrentItems, isConstructorMode, constructorElems, arrForRender }: any) => {
  const dragStartHandler = (e: any, id: any) => {
    setСurrentItems(id);
  };

  return (
    <>
      {arrForRender.length !== 4 && <ConstructorWrapper>
        {constructorElems.map((item: any) => {
          const Component = item.elem
          return (
            <div key={item.id}
              draggable={!item.use && isConstructorMode ? true : false}
              onDragStart={(e: any) => dragStartHandler(e, item.id)}
            >
              <div style={item.use ? { opacity: 0.5 } : { opacity: 1 }} >
                {<Component isConstructor={true} disabled={item.use ?true:false} isConstructorMode={isConstructorMode} />}
                </div>
            </div>
          )
        })}
      </ConstructorWrapper>}
    </>
  );
};
export default Constructor;
