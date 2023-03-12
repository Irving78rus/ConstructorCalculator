import { useState } from "react";
import { ConstructorBlock } from "../../App";
import { insertByIndex } from "../../helpers/helpers";
import Land from "../../icon/Land";
import Line from "../../icon/Line";
import { CalculatorWrapper, TextBlock, Wrapper, Text } from "./style";
import { CalculatorProps } from "./types";

const Calculator = ({
  isConstructorMode,
  usedElements,
  setUsedElements,
  currentItems,
  arrForRender,
  setArrForRender,
}: CalculatorProps) => {
  const [dropItem, setDropItem] = useState<number | null>(null);
  const [startItem, setStartItem] = useState<number | null>(null);
  const [backDropZone, setBackDropZone] = useState<boolean>(false);

  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setBackDropZone(false);

    if (arrForRender.every((item: ConstructorBlock) => item.id !== currentItems)) {
      for (let i = 0; i < usedElements.length; i++) {
        if (arrForRender.length === 0) {
          setArrForRender(
            usedElements.filter((elem: ConstructorBlock) => elem.id === currentItems)
          );
        }
        if (usedElements[i].id === currentItems) {
          if (currentItems === 1) {
            setArrForRender((prev: ConstructorBlock[] | []) => [usedElements[i], ...prev]);
          } else {
            dropItem
              ? setArrForRender((prev: ConstructorBlock[] | []) =>
              insertByIndex(prev, dropItem, usedElements[i])
                )
              : setArrForRender((prev: ConstructorBlock[] | []) => [...prev, usedElements[i]]);
          }

          const newArr = [...usedElements];
          const index = newArr.findIndex((obj: ConstructorBlock) => obj.id === currentItems);
          newArr[index].use = true;
          setUsedElements(newArr);
        }
      }
    }
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setBackDropZone(true);
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setBackDropZone(false);
  };

  const dragStartHandlerItem = (id: number) => {
    setStartItem(id);
  };

  const onDropHandlerItem = (item: ConstructorBlock) => {
    if (startItem === 1) return;
    if (item.id === startItem) return;

    const indexToRemove = arrForRender.findIndex((elem: ConstructorBlock) => elem.id === startItem);
    const indexToInsertAfter = arrForRender.findIndex(
      (elem: ConstructorBlock) => elem.id === item.id
    );

    const removedElement = arrForRender.find((elem) => elem.id === startItem);
    let newArr = arrForRender.filter((elem) => elem.id !== startItem);
    if (removedElement) {
      if (indexToRemove < indexToInsertAfter) {
        setArrForRender(insertByIndex(newArr, indexToInsertAfter, removedElement));
      } else {
        setArrForRender(insertByIndex(newArr, indexToInsertAfter + 1, removedElement));
      }
    }

    setDropItem(null);
  };
  const dragLeaveHandlerItem = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDropItem(null);
  };
  const dragEndHandlerItem = () => {
    setDropItem(null);
  };
  const dragOverHandlerItem = (e: React.DragEvent<HTMLDivElement>, item: ConstructorBlock) => {
    e.preventDefault();
    setDropItem(item.id);
    console.log(dropItem);
  };
  const calculatorWrapperStyle = () => {
    if (arrForRender.length !== 0) return "nonempty";
    if (backDropZone) return "active";
  };

  const handleDoubleClick = (id: number) => {
    if (isConstructorMode) {
      setArrForRender(arrForRender.filter((elem) => elem.id !== id));

      const newArr = [...usedElements];
      const index = newArr.findIndex((obj: ConstructorBlock) => obj.id === id);
      newArr[index].use = false;
      setUsedElements(newArr);
    }
  };
  return (
    <Wrapper>
      <CalculatorWrapper
        onDragOver={(e: React.DragEvent<HTMLDivElement>) => dragOverHandler(e)}
        onDrop={(e: React.DragEvent<HTMLDivElement>) => onDropHandler(e)}
        onDragLeave={(e: React.DragEvent<HTMLDivElement>) => dragLeaveHandler(e)}
        className={calculatorWrapperStyle()}
      >
        {arrForRender.map((item: ConstructorBlock) => {
          const Component = item.elem;

          return (
            <div
              key={item.id}
              draggable={!isConstructorMode || item.id === 1 ? false : true}
              onDragOver={(e) => dragOverHandlerItem(e, item)}
              onDrop={() => onDropHandlerItem(item)}
              onDragStart={() => dragStartHandlerItem(item.id)}
              onDragLeave={(e) => dragLeaveHandlerItem(e)}
              onDragEnd={() => dragEndHandlerItem()}
              onDoubleClick={() => handleDoubleClick(item.id)}
            >
              {<Component isConstructorMode={isConstructorMode} isConstructor={false} />}
              {item.id === dropItem ? <Line></Line> : null}
            </div>
          );
        })}

        {arrForRender.length === 0 && (
          <TextBlock>
            <Land fill={backDropZone ? "#C4C4C4" : "#000000"} />
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
