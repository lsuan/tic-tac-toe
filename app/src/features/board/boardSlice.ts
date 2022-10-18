import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  emptyCells: number,
  winner: number | undefined,
  board: number[],
}

const initialState: InitialState = {
  emptyCells: 9,
  winner: undefined,
  board: [...Array(9)], // element in array will be 0 or 1
}
export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<number[]>) => {
      const boardIndex = action.payload[0];
      const value = action.payload[1];
      state.board[boardIndex] = value;
      state.emptyCells--;
    },

    // after a player picks a cell, check if the player won or tie
    checkGameOver: (state, action: PayloadAction<number>) => {
      if (state.emptyCells === 0) {
        state.winner = 2;
        return;
      }
      
      // 0 1 2
      // 3 4 5
      // 6 7 8
      const winningCombos = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8]
      ];
  
      for (const combo of winningCombos) {
        if (state.board[combo[0]] === action.payload && state.board[combo[1]] === action.payload && state.board[combo[2]] === action.payload) {
          state.winner = action.payload;
          return;
        }
      }
      state.winner = undefined;
    }
  }
});

export default boardSlice.reducer;
export const { setBoard, checkGameOver } = boardSlice.actions;