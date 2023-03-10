import { createSlice, configureStore } from '@reduxjs/toolkit';

export interface CalculatorState {
  operator: string | number | null;
  activeOperator: string | null;
  result: string | number;
  digitalInMemory: any
  digital: any
  secondDigital: any
  displayOver: boolean
  showResult: boolean
}

const initialState: CalculatorState = {
  operator: null,
  activeOperator: null,
  result: '',
  digitalInMemory: '',
  secondDigital: '',
  digital: '',
  displayOver: false,
  showResult: false
};

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    addDigital: (state, action) => {
      state.showResult = false
      if (String(state.digital).includes(".") && action.payload === ".") return

      if (state.result === 'Не определено') {
        state.digital = ""
      }
      console.log(state.digital);

      if (state.digital.length === 18) {
        if (state.displayOver) return
        let dig = state.digital
        dig = dig.split("");
        console.log(dig);
        let temp
        if (parseInt(dig[17]) >= 5) {
          temp = parseInt(dig[17]) + 1
        }
        else {
          temp = parseInt(dig[17])
        }
        console.log(temp);
        dig.splice(17, 1, temp);
        dig = dig.join("");
        state.digital = dig
        state.displayOver = true
        return
      }
      if (state.digital.length > 17) return
      state.digital += action.payload;
      console.log(state.digital);
    },
    addOperator: (state, action) => {

      state.displayOver = false
      if (state.digitalInMemory === "") {
        state.digitalInMemory = state.digital
      }

      state.operator = action.payload;
      state.digital = ''
    },

    calculateResult: (state) => {
      state.showResult = true
      // if(state.result ==='Не определено') {
      //   state.digital=""
      //  }  Math.round(sum * 100) / 100
      switch (state.operator) {
        case '+':
          state.result = Math.round((parseFloat(state.digitalInMemory) + parseFloat(state.digital)) * 100) / 100

          break;
        case '-':
          state.result = Math.round((parseFloat(state.digitalInMemory) - parseFloat(state.digital)) * 100) / 100
          break;
        case 'X':
          state.result = Math.round((parseFloat(state.digitalInMemory) * parseFloat(state.digital)) * 100) / 100
          break;
        case '/':
          console.log(state.digital);

          if (state.digital === "0") {
            state.result = 'Не определено'
            state.digitalInMemory = ''
            return
          }
          state.result = Math.round((parseFloat(state.digitalInMemory) / parseFloat(state.digital)) * 100) / 100
          break;
      }
      console.log(state.digitalInMemory);
      state.digitalInMemory = state.result
      console.log(state.result);

    }
    // calculateResult: (state) => {
    //   let result = 0;
    //   let operator = '+';
    //   state.operators.forEach((value) => {
    //     if (isNaN(Number(value))) {
    //       operator = value;
    //     } else {
    //       switch (operator) {
    //         case '+':
    //           result += Number(value);
    //           break;
    //         case '-':
    //           result -= Number(value);
    //           break;
    //         case '*':
    //           result *= Number(value);
    //           break;
    //         case '/':
    //           result /= Number(value);
    //           break;
    //       }
    //     }
    //   });
    //   state.result = result;
    //   state.operators = [];
    //   state.activeOperator = null;
    // },
  },
});

export const { addOperator, calculateResult, addDigital } = calculatorSlice.actions;
export default calculatorSlice.reducer