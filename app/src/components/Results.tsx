import { useAppDispatch, useAppSelector } from '../states/hooks';
import { clearAll, clearForRematch } from '../features/board/boardSlice';
import { changeTurn } from 'src/features/turn/turnSlice';
import "../styles/results.scss";
 
function Results() {
  const winner = useAppSelector((state) => state.board.winner);
  const players = useAppSelector((state) => state.board.players);
  const winStats = useAppSelector((state) => state.board.winStats);
  const tieStats = useAppSelector((state) => state.board.tieStats);
  const totalGames = useAppSelector((state) => state.board.totalGames);
  
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
          <div className="game-state text-center">
            It's a tie!
          </div>
        }
        {
          winner !== 2 &&
          <div className="game-state flex flex-col justify-center items-center">
            <div className="winner-name text-6xl flex flex-col items-center"> 
              <div className="winner-text mb-1">
                Winner:
              </div>
              <div className="winner flex justify-center items-center">
                <div className="player-name">
                  {players && winner ? players[winner].name : ""}
                </div>
                <img className="max-h-32" src={players && winner? players[winner].character.imageUrl : ""} alt="" />
              </div>
            </div>
          </div>
        }
      </div>
      {/* TODO: make this section a card */}
      <div className="stats flex flex-col items-center text-3xl mb-5">
        <div className="stats-header mb-1">
          {
            `${players && players[0].name.toUpperCase()} | ${players && players[1].name.toUpperCase()} | TIES`
          }
        </div>
        <div className="stats-info mb-1">
          {
            `${winStats[0].occurrences} | ${winStats[1].occurrences} | ${tieStats.occurrences}`
          }
        </div>
        <div className="total">
          {`
            TOTAL GAMES: ${totalGames}`
          }
        </div>
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
