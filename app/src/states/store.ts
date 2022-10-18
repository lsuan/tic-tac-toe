import { configureStore } from "@reduxjs/toolkit";
import turnReducer from "../features/turn/turnSlice"
import boardReducer from "../features/board/boardSlice";

const store = configureStore({
  reducer: {
    turn: turnReducer,
    board: boardReducer,
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


