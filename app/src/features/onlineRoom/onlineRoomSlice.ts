import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Character from "src/character";

type InitialState = {
  isInRoom: boolean,
  players: Player[],
  turn: number,
}

type Player = {
  name: string,
  character: Character,
}

const initialState: InitialState = {
  isInRoom: false,
  players: [],
  turn: 0,
}

export const joinRoomSlice = createSlice({
  name: "joinRoom",
  initialState,
  reducers: {
    setIsInRoom: (state, action: PayloadAction<boolean>) => {
      state.isInRoom = action.payload;
    },
    setPvPPlayers: (state, action: PayloadAction<Player[]>) => {
      const newPlayers = state.players.concat(action.payload);
      state.players = newPlayers;
    },
    setTurn: (state, action: PayloadAction<number>) => {
      state.turn = action.payload;
    }
  }
});

export default joinRoomSlice.reducer;
export const { setIsInRoom, setPvPPlayers, setTurn } = joinRoomSlice.actions;