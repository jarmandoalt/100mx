import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  dataQ100: [],
  dataQ5: []
};

const crudReducer = createSlice({
  name: "crud",
  initialState,
  reducers: {
    DATAQ100: (state, action) => {
      state.dataQ100.push(...action.payload);
    },
    DATAQ5: (state, action) => {
      state.dataQ5.push(...action.payload)
    }
  },
});

const {actions, reducer} = crudReducer

export const {
  DATAQ5,
  DATAQ100
} = actions;

export default reducer;