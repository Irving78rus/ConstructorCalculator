import { ConstructorBlock } from "../../App";

export interface ConstructorProps{
    isConstructorMode:boolean;
    usedElements:ConstructorBlock[]|[]
  
    currentItems:number|null;
    setCurrentItems:(currentItems: number|null) => void
    arrForRender:ConstructorBlock[]|[]
   
  }