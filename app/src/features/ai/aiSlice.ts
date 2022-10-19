import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addSyntheticTrailingComment } from "typescript";

// TODO: update this once I get character assets
type InitialState = {
  turnNumber: number | undefined,
  character: string,
}

const initialState: InitialState = {
  turnNumber: 1,
  character: ""
}

export const turnSlice = createSlice({
  name: "turn",
  initialState,
  reducers: {
  }
});

export default turnSlice.reducer;
export const { } = turnSlice.actions;