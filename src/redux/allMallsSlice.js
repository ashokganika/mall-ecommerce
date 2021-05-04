import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findAllMall } from "../services/firebaseDatabaseService";

export const getAllMalls = createAsyncThunk("allMalls", async () => {
  const data = await findAllMall();
  const allMalls = [];
  data.forEach((mall) => allMalls.push({ id: mall.id, ...mall.data() }));
  return allMalls;
});

const allMallsReducer = createSlice({
  name: "allMalls",
  initialState: { loading: false, malls: [] },
  extraReducers: {
    [getAllMalls.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllMalls.fulfilled]: (state, action) => {
      state.loading = false;
      state.malls = action.payload;
    },
  },
});

export default allMallsReducer.reducer;
