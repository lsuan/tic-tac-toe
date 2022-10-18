import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../states/hooks";
import { changeTurn } from "./turn/turnSlice";
import { checkGameOver, setBoard } from "./board/boardSlice";
import "../styles/cell.scss";

type CellProps = {
  number: number;
}

function Cell(props: CellProps) {
  const [buttonText, setButtonText] = useState("");
  const currentTurn = useAppSelector((state) => state.turn.value);
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    // TODO: change this to show img on cell
    if (button.value === "") {
      button.value = `${currentTurn}`;
      setButtonText(currentTurn.toString());
      const buttonNumber = Number(button.parentElement?.classList[0].split("-")[1]);
      dispatch(setBoard( [buttonNumber, currentTurn] ));
      dispatch(checkGameOver(currentTurn));
      const nextTurn = currentTurn === 0 ? 1 : 0;
      dispatch(changeTurn(nextTurn));
    }
  }

  return (
    <div id="cell" className={`cell-${props.number} bg-stone-500`}>
      <button className="w-full h-full" onClick={handleClick}>
        {buttonText}
      </button>
    </div>
  )
}

export default Cell;