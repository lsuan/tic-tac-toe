import Board from "src/features/board/Board";
import { useAppSelector } from "src/states/hooks";

type Proceedable = {
  canProceed: boolean
}

function Game(canProceed: Proceedable) {
  const turn = useAppSelector((state) => state.turn.value);
  const winner = useAppSelector((state) => state.board.winner);
  const players = useAppSelector((state) => state.board.players);
  
  return (
    <section id="game">
      <div className="player-turn">
        {
          winner === undefined &&
          <div className="game-state flex justify-center items-center mb-5">
            <div className="text-center text-4xl sm:text-5xl" style={{textShadow: "5px 5px 0px var(--blue), 9px 8px 0px rgba(0,0,0,0.15)"}}>
              {players.length === 2 ? `Turn: ${players[turn].name}` : "Waiting for other player to join..."}
            </div>
            <img className="max-h-16 md:max-h-20" src={players.length === 2 ? players[turn].character.imageUrl : ""} alt="" />
          </div>
        }
        {
          winner !== undefined && canProceed &&
          <div className="text-4xl sm:text-5xl mb-5 text-center" style={{textShadow: "5px 5px 0px var(--blue), 9px 8px 0px rgba(0,0,0,0.15)"}}>
            <i className="fa-solid fa-spinner animate-spin text-3xl mr-3" />
            Tallying score...
          </div>
        }
      </div>
      <Board />
    </section>
  )
}

export default Game;