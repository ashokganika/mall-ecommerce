import { configureStore } from "@reduxjs/toolkit";
import shopImageReducer from "./shopImageSlice";
import allMallsReducer from "./allMallsSlice";

const store = configureStore({
  reducer: {
    shopImageReducer,
    allMallsReducer,
  },
  //middleware: [...getDefaultMiddleware({ serializableCheck: false })],
});

export default store;
