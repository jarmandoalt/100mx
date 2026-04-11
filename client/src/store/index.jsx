import { configureStore } from '@reduxjs/toolkit'
import crudReducer from "../reducers/crudReducers"

  export const store = configureStore({
    reducer: {
      reducer: crudReducer
    } 
  })
