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
  result: 0,
  digitalInMemory: 0,
  secondDigital: 0,
  digital: [],
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

if (state.result) {
        
        state.digital  =[]
        
        if (state.result === 'Не определено') {
          state.digitalInMemory  = 0
           
        }
        state.result = 0
      }
      if (state.digital.length === 16) {
        if (state.displayOver) return
        let dig = state.digital
       
        console.log(dig);
        let temp
        if (parseInt(dig[15]) >= 5) {
          temp = parseInt(dig[15]) + 1
        }
        else {
          temp = parseInt(dig[15])
        }
        console.log(temp);
        dig.splice(15, 1, temp);
         
        state.digital = dig
        state.displayOver = true
        return
      }
      if (state.digital.length > 15) return
      console.log(action.payload);
     state.digital.push(action.payload)  
       
    },
    addOperator: (state, action) => {
      state.operator=action.payload
      state.displayOver = false
      if (!state.digitalInMemory) {
        state.digitalInMemory=parseFloat(state.digital.join(""));
      }
     
       state.digital=[]
      
   
    },

    calculateResult: (state) => {
      state.showResult = true
      // if(state.result ==='Не определено') {
      //   state.digital=""
      //  }  Math.round(sum * 100) / 100
      switch (state.operator) {
        case '+':
          console.log(state.digitalInMemory);
          console.log(parseFloat(state.digital.join("")));
          state.result = Math.round((state.digitalInMemory + parseFloat(state.digital.join(""))) * 100) / 100

          break;
        case '-':
          state.result = Math.round((state.digitalInMemory - parseFloat(state.digital.join(""))) * 100) / 100
          break;
        case 'X':
          state.result = Math.round((state.digitalInMemory * parseFloat(state.digital.join(""))) * 100) / 100
          break;
        case '/':
          console.log(state.digital);

          if (parseFloat(state.digital.join("")) === 0) {
            state.result = 'Не определено'
            state.digitalInMemory = 0
            return
          }
          state.result = Math.round((state.digitalInMemory / parseFloat(state.digital.join(""))) * 100) / 100
          break;
      }
      
      state.digitalInMemory = state.result
      console.log(state.digitalInMemory);

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