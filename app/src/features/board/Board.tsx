import Cell from "../../components/Cell";
import "src/styles/board.scss";
import socketService from "src/services/socketService";
import gameService from "src/services/gameService";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/states/hooks";
import { setPlayers } from "./boardSlice";


function Board() {
  const cells = [...Array(9).keys()];
  const gameMode = useAppSelector((state) => state.board.gameMode);
  const players = useAppSelector((state) => state.board.players);
  const dispatch = useAppDispatch();
  
  const handleGameStart = () => {
    if (socketService.socket) {
      console.log("local players");
      console.log(players);
      gameService.onStartGame(socketService.socket, (player) => {
        console.log("board players");
        console.log([player]);
        dispatch(setPlayers([player]));
        console.log(players);
      });
    }
  }

  useEffect( () => {
    if (gameMode === "pvp") {
      handleGameStart();
    }
  }, []);
  return (
    <div id="board" className="rounded grid grid-rows-3 grid-cols-3 w-fit mx-auto">
      {
        cells.map((number, i) => {
          return <div className="w-fit h-fit" key={number}>
            <Cell {...{number}} />
          </div>
        })
      }
    </div>
  );
}

export default Board;