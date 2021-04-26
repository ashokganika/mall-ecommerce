import { configureStore } from "@reduxjs/toolkit";
import shopImageReducer from "./shopImageSlice";

const store = configureStore({
  reducer: {
    shopImageReducer,
  },
  //middleware: [...getDefaultMiddleware({ serializableCheck: false })],
});

export default store;
