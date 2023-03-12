import { ConstructorBlock } from "../../App";
import { ConstructorWrapper } from "./style";
import { ConstructorProps } from "./types";

const Constructor = ({
  setCurrentItems,
  isConstructorMode,
  usedElements,
  arrForRender,
}: ConstructorProps) => {
  const dragStartHandler = (id: number) => {
    
    setCurrentItems(id);
  };

  return (
    <>
      {arrForRender.length !== 4 && isConstructorMode && (
        <ConstructorWrapper>
          {usedElements.map((item: ConstructorBlock) => {
            const Component = item.elem;
            return (
              <div
                key={item.id}
                draggable={!item.use && isConstructorMode ? true : false}
                onDragStart={() => dragStartHandler(item.id)}
              >
                <div style={item.use ? { opacity: 0.5 } : { opacity: 1 }}>
                  {
                    <Component
                      isConstructor={true}
                      disabled={item.use ? true : false}
                      isConstructorMode={isConstructorMode}
                    />
                  }
                </div>
              </div>
            );
          })}
        </ConstructorWrapper>
      )}
    </>
  );
};
export default Constructor;
