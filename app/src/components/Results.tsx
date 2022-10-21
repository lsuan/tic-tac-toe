import { useAppDispatch, useAppSelector } from '../states/hooks';
import { clearAll, clearForRematch } from '../features/board/boardSlice';
import { changeTurn } from 'src/features/turn/turnSlice';
 
function Results() {
  const winner = useAppSelector((state) => state.board.winner);
  const players = useAppSelector((state) => state.board.players);
  
  const dispatch = useAppDispatch();
  const handleRematch = () => {
    dispatch(clearForRematch());
    const firstPlayer = Math.floor(Math.random() * 2);
    dispatch(changeTurn(firstPlayer));
  }
  return (
    <section className="results w-full mx-auto">
      <div className="text-6xl mb-10">
        {
          winner === 2 &&
          <h1 className="game-state text-center">
            It's a tie!
          </h1>
        }
        {
          winner !== 2 &&
          <div className="game-state flex flex-col items-center">
            <img className="max-h-32 mb-3" src={players && winner? players[winner].character.imageUrl : ""} alt="" />
            <div className="winner-name text-6xl"> 
              {players && winner ? players[winner].name : ""}
            </div>
          </div>
        }
      </div>
      <div className="action-btns flex justify-center">
        <button 
          className="rematch btn rounded-lg py-2 w-48 mr-3" 
          onClick={() => handleRematch() }
        >
          Rematch
        </button>
        <button 
          className="quit btn rounded-lg py-2 w-48 ml-3" 
          onClick={() => dispatch(clearAll()) }
        >
          Quit
        </button>
      </div>

    </section>
  );
}

export default Results;
