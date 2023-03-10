import { createSlice, configureStore } from '@reduxjs/toolkit';

export interface AssemblySlice {
  baseState:any[]
}

const initialState: AssemblySlice = {
  baseState: [],
   
};

const assemblySlice = createSlice({
  name: 'assembly',
  initialState,
  reducers: { 
    addBlock: (state, action) => {
      state.baseState.push(action.payload);
    },
  },
});

export const {addBlock} = assemblySlice.actions;
export default assemblySlice.reducer