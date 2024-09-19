import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./Reducer/krossSlice";

export const store = configureStore({
  reducer: {
    shop: shopReducer,
  },
});
