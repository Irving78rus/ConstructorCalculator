import { createSlice} from "@reduxjs/toolkit";
import { validationAnswer } from "../helpers/helpers";

export interface CalculatorState {
  operator: string | number | null;
  activeOperator: string | null;
  result: string | number;
  digitalInMemory: number;
  digital: string[];
  isMaxLengthDisplay: boolean;
  showResult: boolean;
}

const initialState: CalculatorState = {
  operator: null,
  activeOperator: null,
  result: 0,
  digitalInMemory: 0,
  digital: [],
  isMaxLengthDisplay: false,
  showResult: false,
};

const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    deleteValue: (state) => {
      state.digital = [];
    },
    deletePrevItem: (state, action) => {
      if (state.digital[action.payload]) {
        state.digital.splice(action.payload, 1);
      }
    },
    addDigitalFromDisplay: (state, action) => {
      state.digital = action.payload.split("");
    },
    deleteResult: (state) => {
      state.result = 0;
      state.digitalInMemory = 0;
    },
    addDigital: (state, action) => {
      state.showResult = false;
      if (String(state.digital).includes(".") && action.payload === ".") return;
      if (state.result) {
        state.digital = [];
        if (state.result === "Не определено") {
          state.digitalInMemory = 0;
        }
        state.result = 0;
      }

      state.digital.push(action.payload);
    },
    addOperator: (state, action) => {
      state.operator = action.payload;
      state.isMaxLengthDisplay = false;
      if (!state.digitalInMemory) {
        state.digitalInMemory = parseFloat(state.digital.join(""));
      }

      state.digital = [];
    },

    calculateResult: (state) => {
      state.showResult = true;
      let answer: number=0;
      let validatedResponse;
      switch (state.operator) {
        case "+":
          answer = state.digitalInMemory + parseFloat(state.digital.join(""));
          break;
        case "-":
          answer = state.digitalInMemory - parseFloat(state.digital.join(""));
          break;
        case "X":
          answer = state.digitalInMemory * parseFloat(state.digital.join(""));
          break;
        case "/":
          if (parseFloat(state.digital.join("")) === 0) {
            state.result = "Не определено";
            state.digitalInMemory = 0;
            return;
          }
          answer = state.digitalInMemory / parseFloat(state.digital.join(""));
          break;
      }
      validatedResponse = validationAnswer(state.digitalInMemory, answer);
      state.result = validatedResponse.result;
      state.digitalInMemory = validatedResponse.digitalInMemory;
    },
  },
});

export const {
  addOperator,
  calculateResult,
  addDigital,
  addDigitalFromDisplay,
  deletePrevItem,
  deleteValue,
  deleteResult,
} = calculatorSlice.actions;
export default calculatorSlice.reducer;
