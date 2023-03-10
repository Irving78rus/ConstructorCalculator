import { createSlice, configureStore } from '@reduxjs/toolkit';

export interface ConstructorSlice {
  baseState:any[]
}

const initialState: ConstructorSlice = {
  baseState: [],
   
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: { 
    addBlock: (state, action) => {
      state.baseState.push(action.payload);
    },
  },
});

export const {addBlock} = constructorSlice.actions;
export default constructorSlice.reducer