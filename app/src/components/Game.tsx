import Board from "src/features/board/Board";
import { useAppSelector } from "src/states/hooks";

function Game() {
  const turn = useAppSelector((state) => state.turn.value);
  const winner = useAppSelector((state) => state.board.winner);
  const players = useAppSelector((state) => state.board.players);
  
  return (
    <section id="game">
      <div className="player-turn">
        {
          winner === undefined &&
          <div className="game-state flex justify-center items-center mb-5">
            <div className="text-center text-5xl" style={{textShadow: "5px 5px 0px var(--blue), 9px 8px 0px rgba(0,0,0,0.15)"}}>
              {`Turn: ${players ? players[turn].name : ""}`}
            </div>
            <img className="max-h-20" src={players ? players[turn].character.imageUrl : ""} alt="" />
          </div>
        }
      </div>
      <Board />
    </section>
  )
}

export default Game;