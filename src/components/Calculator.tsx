import React, { useState } from "react";
import styled from "styled-components";
import { ConstructorBlock } from "../App";
import Land from "../icon/Land";
import Line from "../icon/Line";

const Wrapper = styled.div`
  display: flex;
  height: 448px;
  flex-direction: column;
  align-items: space-between;
   div{
    box-shadow: none;
   }
  gap: 20px;
  .nonempty{
    border: none;
  };
   
`;
const CalculatorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 2px dashed #c4c4c4;
  border-radius: 6px;
  gap: 12px;
  width: 243px;
  height: 448px;
   
  &.active{
      background-color: #F0F9FF;
       
  };
   
  
`;
const Text = styled.p`
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
const TextBlock = styled.span`
 margin-top:70%;
 svg{
  margin-left:50px;
 }
`;
interface CalculatorProps {
  isConstructorMode: boolean;
  usedElements: ConstructorBlock[] | []
  setUsedElements: (usedElements: ConstructorBlock[] | []) => void;
  currentItems: number | null;
  arrForRender: ConstructorBlock[] | []
  setArrForRender: (arrForRender: any) => void;
}

const Calculator = ({
  isConstructorMode,
  usedElements,
  setUsedElements,
  currentItems,
  arrForRender,
  setArrForRender
}: CalculatorProps) => {
  const [dropItem, setDropItem] = useState<number | null>(null);
  const [startItem, setStartItem] = useState<number | null>(null);
  const [backDropZone, setBackDropZone] = useState<boolean>(false);
  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setBackDropZone(false)

    if (arrForRender.every((item: ConstructorBlock) => item.id !== currentItems)) {
      for (let i = 0; i < usedElements.length; i++) {
        if (usedElements[i].id === currentItems) {

          if (currentItems === 1) {
            setArrForRender((prev: ConstructorBlock[] | []) => [usedElements[i], ...prev]);
          } else {
            setArrForRender((prev: ConstructorBlock[] | []) => [...prev, usedElements[i]]);
          }
          const newArr = [...usedElements]
          const index = newArr.findIndex((obj: ConstructorBlock) => obj.id === currentItems);

          newArr[index].use = true;
          setUsedElements(newArr)
        }
      }
    }
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
     setBackDropZone(true)
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setBackDropZone(false)
  };

  const dragStartHandlerItem = (id: number) => {
    setStartItem(id)
  };

  function insertAt(array: ConstructorBlock[], index: number, element: ConstructorBlock[]) {
    return [...array.slice(0, index), ...element, ...array.slice(index)];
  }

  const onDropHandlerItem = (e: React.DragEvent<HTMLDivElement>, item: ConstructorBlock) => {
    if (startItem === 1) return
    if (item.id === startItem) return
    const newArr = [...arrForRender];
    const indexToRemove = newArr.findIndex((elem: ConstructorBlock) => elem.id === startItem);
    const indexToInsertAfter = newArr.findIndex((elem: ConstructorBlock) => elem.id === item.id);
    const removedElement = newArr.splice(indexToRemove, 1);
    let newArray = []
    if (indexToRemove < indexToInsertAfter) {
      newArray = insertAt(newArr, indexToInsertAfter, removedElement);
    }
    else {
      newArray = insertAt(newArr, indexToInsertAfter + 1, removedElement);
    }
    setArrForRender(newArray);
    setDropItem(null)
  };
  const dragLeaveHandlerItem = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDropItem(null)
  };
  const dragEndHandlerItem = (e: React.DragEvent<HTMLDivElement>) => {
    setDropItem(null)
  };
  const dragOverHandlerItem = (e: React.DragEvent<HTMLDivElement>, item: ConstructorBlock) => {
    e.preventDefault();
    setDropItem(item.id)

  };
  const calculatorWrapperStyle = () => {
    if (arrForRender.length !== 0) return "nonempty"
    if (backDropZone) return 'active'
    return undefined
  }
  return (
    <Wrapper>
      <CalculatorWrapper
        onDragOver={(e: React.DragEvent<HTMLDivElement>) => dragOverHandler(e)}
        onDrop={(e: React.DragEvent<HTMLDivElement>) => onDropHandler(e)}
        onDragLeave={(e: React.DragEvent<HTMLDivElement>) => dragLeaveHandler(e)}
        className={calculatorWrapperStyle()}
      >
        {arrForRender.map((item: ConstructorBlock) => {
          const Component = item.elem

          return (
            <div
              key={item.id}
              draggable={!isConstructorMode || item.id === 1 ? false : true}
              onDragOver={(e) => dragOverHandlerItem(e, item)}
              onDrop={(e) => onDropHandlerItem(e, item)}
              onDragStart={() => dragStartHandlerItem(item.id)}
              onDragLeave={(e) => dragLeaveHandlerItem(e)}
              onDragEnd={(e) => dragEndHandlerItem(e)}
            >
              {<Component isConstructorMode={isConstructorMode} isConstructor={false} />}
              {item.id === dropItem ? <Line ></Line> : null}

            </div>
          )
        })}

        {arrForRender.length === 0 && (
          <TextBlock>
            <Land fill={backDropZone ? '#C4C4C4' : '#000000'} />
            <Text>
              <span>Перетащите сюда</span> <br /> любой элемент <br />
              из левой панели
            </Text>
          </TextBlock>
        )}
      </CalculatorWrapper>
    </Wrapper>
  );
};
export default Calculator;
