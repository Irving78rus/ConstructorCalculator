import React, { useEffect, useState } from "react";
import styled from "styled-components";
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
const TextBlock = styled.p`
 margin-top:70%;
 svg{
  margin-left:50px;
 }
`;


const Calculator = ({
  isConstructorMode,
  constructorElems,
  setConstructorElems,
  currentItems,
  arrForRender,
  setarrForRender
}: any) => {
  const [dropItem, setdropItem] = useState<any>(null);
  const [startItem, setStartItem] = useState<any>(null);
  const [backDropZone, setBackDropZone] = useState<any>(false);
  const onDropHandler = (e: any) => {
    e.preventDefault();
    setBackDropZone(false)
    if (arrForRender.every((item: any) => item.id !== currentItems)) {
      for (let i = 0; i < constructorElems.length; i++) {
        if (constructorElems[i].id === currentItems) {

          if (currentItems === 1) {
            setarrForRender((prev: any) => [constructorElems[i], ...prev]);
          } else {
            setarrForRender((prev: any) => [...prev, constructorElems[i]]);
          }
          const newArr = [...constructorElems]
          const index = newArr.findIndex((obj: any) => obj.id === currentItems);

          // Обновить поле name для найденного объекта
          newArr[index].use = true;
          setConstructorElems(newArr)
        }
      }
    }

  };

  const dragOverHandler = (e: any) => {
    e.preventDefault();
    
 
const children = e.target.childNodes
for (let i = 0; i < children.length; i++) {
  console.log(children[i].offsetTop,'chil');
}
const yCursor = e.pageY
console.log(yCursor,'y');

 

    setBackDropZone(true)
  };
  const dragLeaveHandler = (e: any) => {
    e.preventDefault();

    setBackDropZone(false)
  };
  const dragStartHandlerItem = (e: any, item: any) => {
    setStartItem(item.id)
  };
  function insertAt(array: any, index: any, element: any) {
    return [...array.slice(0, index), ...element, ...array.slice(index)];
  }
  const onDropHandlerItem = (e: any, item: any) => {
    if (startItem === 1) return
    if (item.id === startItem) return
    const newArr = [...arrForRender];
    const indexToRemove = newArr.findIndex((elem: any) => elem.id === startItem);
    const indexToInsertAfter = newArr.findIndex((elem: any) => elem.id === item.id);
    const removedElement = newArr.splice(indexToRemove, 1);
    let newArray = []
    if (indexToRemove < indexToInsertAfter) {
      newArray = insertAt(newArr, indexToInsertAfter, removedElement);
    }
    else {
      newArray = insertAt(newArr, indexToInsertAfter + 1, removedElement);
    }
    setarrForRender(newArray);
    setdropItem(null)
  };
  const dragLeaveHandlerItem = (e: any) => {
    e.preventDefault();
    setdropItem(null)

  };
  const dragEndHandlerItem = (e: any) => {
    setdropItem(null)
  };
  const dragOverHandlerItem = (e: any, item: any) => {
    e.preventDefault();
    setdropItem(item.id)

  };
  const calculatorWrapperStyle = () => {
    if (arrForRender.length !== 0) return "nonempty"
    if (backDropZone) return 'active'
    return undefined
  }
  return (
    <Wrapper>
      <CalculatorWrapper
        onDragOver={(e: any) => dragOverHandler(e)}
        onDrop={(e: any) => onDropHandler(e)}
        onDragLeave={(e: any) => dragLeaveHandler(e)}
        className={calculatorWrapperStyle()}

      >
        {arrForRender.map((item: any) => {
          const Component = item.elem

          return (
            <div
              key={item.id}
              draggable={!isConstructorMode || item.id === 1 ? false : true}
              onDragOver={(e: any) => dragOverHandlerItem(e, item)}
              onDrop={(e: any) => onDropHandlerItem(e, item)}
              onDragStart={(e: any) => dragStartHandlerItem(e, item)}
              onDragLeave={(e: any) => dragLeaveHandlerItem(e)}
              onDragEnd={(e: any) => dragEndHandlerItem(e)}
             
            >
              <div>  {<Component isConstructorMode={isConstructorMode} isConstructor={false} />}

                {item.id === dropItem ? <Line ></Line> : null}

              </div>


            </div>
          )
        })}

        {arrForRender.length === 0 && (
          <TextBlock>
            <Land  fill={backDropZone?'#C4C4C4':'#000000'} />
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
