import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: number,
}

const initialState: InitialState = {
  value: 0,
}
export const turnSlice = createSlice({
  name: "turn",
  initialState,
  reducers: {
    changeTurn: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  }
});

export default turnSlice.reducer;
export const { changeTurn } = turnSlice.actions;