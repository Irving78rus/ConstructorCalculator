import styled from "styled-components";
import { ConstructorBlock } from "../App";
 
const ConstructorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 240px;
  height: 448px;
  gap: 12px;
`;
interface ConstructorProps{
  isConstructorMode:boolean;
  usedElements:ConstructorBlock[]|[]

  currentItems:number|null;
  setCurrentItems:(currentItems: number|null) => void
  arrForRender:ConstructorBlock[]|[]
 
}
const Constructor = ({ setCurrentItems, isConstructorMode, usedElements, arrForRender }: ConstructorProps) => {
  const dragStartHandler = (id: number) => {
    setCurrentItems(id);
  };

  return (
    <>
      {arrForRender.length !== 4 && <ConstructorWrapper>
        {usedElements.map((item: ConstructorBlock) => {
          const Component = item.elem
          return (
            <div key={item.id}
              draggable={!item.use && isConstructorMode ? true : false}
              onDragStart={() => dragStartHandler(item.id)}
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
