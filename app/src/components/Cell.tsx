import React, { useRef } from "react";
import { useAppSelector, useAppDispatch } from "../states/hooks";
import { changeTurn } from "../features/turn/turnSlice";
import { checkGameOver, setBoard } from "../features/board/boardSlice";
import "src/styles/cell.scss";
import gameService from "src/services/gameService";
import socketService from "src/services/socketService";

type CellProps = {
  number: number;
}

function Cell(props: CellProps) {
  const buttonRef = useRef(null);
  const currentTurn = useAppSelector((state) => state.turn.value);
  const board = useAppSelector((state) => state.board.board);
  const gameMode = useAppSelector((state) => state.board.gameMode);
  const dispatch = useAppDispatch();
  const players = useAppSelector((state) => state.board.players);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    if (button.value === "") {
      const characterImage = players ? players[currentTurn].character.imageUrl : "";
      if (buttonRef.current) {
        const btn: Element = buttonRef.current;
        btn.setAttribute("src", characterImage);
      }
      button.value = `${currentTurn}`;
      const buttonNumber = Number(button.parentElement?.classList[0].split("-")[1]);
      dispatch(setBoard( [buttonNumber, currentTurn] ));

      if (gameMode === "pvp" && socketService.socket) {
        gameService.updateGame(socketService.socket, board);
      }
      dispatch(checkGameOver(currentTurn));
      const nextTurn = currentTurn === 0 ? 1 : 0;
      dispatch(changeTurn(nextTurn));
    }
  }

  return (
    <div id="cell" className={`cell-${props.number} bg-stone-500 w-20 h-20 sm:w-36 sm:h-36`}>
      <button className="w-full h-full" onClick={handleClick}>
        <img className="w-9/12 m-auto" ref={buttonRef} alt=""/>
      </button>
    </div>
  )
}

export default Cell;