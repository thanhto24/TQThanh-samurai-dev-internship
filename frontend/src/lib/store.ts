import { configureStore } from "@reduxjs/toolkit"
import chartReducer from "./features/chartSlice"
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    chart: chartReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
