import { ConstructorBlock } from "../App";

export function insertByIndex(array: ConstructorBlock[], index: number, element: ConstructorBlock) {
  return [...array.slice(0, index), element, ...array.slice(index)];
}

export const toFixedParam = (answer: number) => {
  let answerStr = answer.toString();
  if (Math.floor(answer).toString().length > 12) return 0;
  if (12 - answerStr.length > 0) {
    return answerStr.length;
  }
  return 12 - Math.floor(answer).toString().length;
};

export const validationAnswer = (digitalInMemory: number, answer: number) => {
  let result;
  if (Math.floor(answer).toString().length > 12) {
    result = parseFloat(answer.toFixed(toFixedParam(answer))).toExponential(6);
    digitalInMemory = parseFloat(result);
  } else {
    result = parseFloat(answer.toFixed(toFixedParam(answer)));
    digitalInMemory = result;
  }
  return { result, digitalInMemory };
};
