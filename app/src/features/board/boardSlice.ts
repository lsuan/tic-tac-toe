import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Character from "src/character";

type InitialState = {
  gameMode: string | undefined,
  players: Player[] | undefined,
  board: number[],
  emptyCells: number,
  winner: number | undefined,
  winStats: Stats[],
  tieStats: Stats,
  totalGames: number,
}

type Player = {
  name: string,
  character: Character,
}

type Stats = {
  occurrences: number,
}

const initialState: InitialState = {
  gameMode: undefined,
  players: undefined,
  board: [...Array(9)], // element in array will be 0 or 1
  emptyCells: 9,
  winner: undefined,
  winStats: [
    { occurrences: 0 }, 
    { occurrences: 0 }
  ],
  tieStats: { occurrences: 0 },
  totalGames: 0,
}
export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setGameMode: (state, action: PayloadAction<string>) => {
      state.gameMode = action.payload;
    },

    setPlayers: (state, action: PayloadAction<Player[]>) => {
      state.players = action.payload;
    },

    setBoard: (state, action: PayloadAction<number[]>) => {
      const boardIndex = action.payload[0];
      const value = action.payload[1];
      state.board[boardIndex] = value;
      state.emptyCells--;
    },

    // after a player picks a cell, check if the player won or tie
    checkGameOver: (state, action: PayloadAction<number>) => {      
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
          state.winStats[action.payload].occurrences++;
          state.totalGames++;
          return;
        }
      }

      if (state.emptyCells === 0) {
        state.winner = 2;
        state.tieStats.occurrences++;
        state.totalGames++;
      } else {
        state.winner = undefined;
      }
    },

    clearForRematch: (state) => {
      const newBoard = [...Array(9)];
      state.board = newBoard;
      state.emptyCells = 9;
      state.winner = undefined;
    },

    clearAll: (state) => {
      state.gameMode = "";
      state.players = undefined;
      const newBoard = [...Array(9)];
      state.board = newBoard;
      state.emptyCells = 9;
      state.winner = undefined;
      state.winStats = [
        { occurrences: 0 }, 
        { occurrences: 0 }
      ];
      state.tieStats = { occurrences: 0 };
      state.totalGames = 0;
    }
  }
});

export default boardSlice.reducer;
export const { setGameMode, setPlayers, setBoard, checkGameOver, clearForRematch, clearAll } = boardSlice.actions;