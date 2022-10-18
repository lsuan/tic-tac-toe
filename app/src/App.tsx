import './App.css';
import Board from './features/board/Board';
import { useAppSelector } from "./states/hooks";


function App() {
  const turn = useAppSelector((state) => state.turn.value);
  const winner = useAppSelector((state) => state.board.winner);
   
  return (
    <div className="App md:container mx-auto">
      <h1 className="app-title ">
        TIC TAC TOE
      </h1>
      {/* TODO: change this to say "Player: ${player-name} ${character}" */}
      <div className="player-turn">
        {
          winner === undefined &&
            <div className="text">
              {`Turn: ${turn}`}
            </div>
        }
        {
          winner === 2 &&
            <div className="text">
              It's a tie!
            </div>
          
        }
        {
          winner === 0 &&
            <div className="text">
              Player 0 wins!
            </div>
        }
        {
          winner === 1 &&
            <div className="text">
              Player 1 wins!
            </div>
        }
      </div>
      <section className="game">
        <Board />
      </section>
    </div>
  );
}

export default App;
