import { createSlice, configureStore } from "@reduxjs/toolkit";

export interface CalculatorState {
  operator: string | number | null;
  activeOperator: string | null;
  result: string | number;
  digitalInMemory: number;
  digital: any;
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
    deleteValue: (state ) => {
      state.digital =[]
    },
    deletePrevItem: (state, action) => {
      if(state.digital[action.payload ]){
        state.digital.splice(action.payload , 1);
      }
     
    },
    addDigitalFromDisplay: (state, action) => {
      state.digital = action.payload.split("");
     
      
    }, 
    deleteResult: (state ) => {
      state.result = 0;
     
      
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
      let temp;

      if (state.digital.length === 8) {
        if (state.isMaxLengthDisplay) return;
        if (parseInt(state.digital[7]) >= 5) {
          temp = parseInt(state.digital[7]) + 1;
        } else {
          temp = parseInt(state.digital[7]);
        }
        state.digital.splice(7, 1, temp);

        state.isMaxLengthDisplay = true;
        return;
      }
      if (state.digital.length > 7) return;

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

      switch (state.operator) {
        case "+":
          state.result =
            Math.round((state.digitalInMemory + parseFloat(state.digital.join(""))) * 100) / 100;
          state.digitalInMemory = state.result;
          break;
        case "-":
          state.result =
            Math.round((state.digitalInMemory - parseFloat(state.digital.join(""))) * 100) / 100;
          state.digitalInMemory = state.result;
          break;
        case "X":
          state.result =
            Math.round(state.digitalInMemory * parseFloat(state.digital.join("")) * 100) / 100;
          state.digitalInMemory = state.result;
          break;
        case "/":
          if (parseFloat(state.digital.join("")) === 0) {
            state.result = "Не определено";
            state.digitalInMemory = 0;
            return;
          }
          state.result =
            Math.round((state.digitalInMemory / parseFloat(state.digital.join(""))) * 100) / 100;
          state.digitalInMemory = state.result;
          break;
      }
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
  deleteResult
} = calculatorSlice.actions;
export default calculatorSlice.reducer;
