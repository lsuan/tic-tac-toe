import { useAppDispatch, useAppSelector } from '../states/hooks';
import { clearAll, clearForRematch } from '../features/board/boardSlice';
import { changeTurn } from 'src/features/turn/turnSlice';
import "../styles/results.scss";
import { Dispatch, SetStateAction } from 'react';

type Proceedable = {
  setCanProceed: Dispatch<SetStateAction<boolean>>
}

function Results(props: Proceedable) {
  const winner = useAppSelector((state) => state.board.winner);
  const players = useAppSelector((state) => state.board.players);
  const winStats = useAppSelector((state) => state.board.winStats);
  const tieStats = useAppSelector((state) => state.board.tieStats);
  const totalGames = useAppSelector((state) => state.board.totalGames);
  
  const dispatch = useAppDispatch();
  const handleRematch = () => {
    const firstPlayer = Math.floor(Math.random() * 2);
    dispatch(changeTurn(firstPlayer));
    props.setCanProceed(false);
    dispatch(clearForRematch());
  }

  return (
    <section className="results w-11/12 mx-auto">
      <div className="text-5xl sm:text-6xl m-5 sm:mb-10">
        {
          winner === 2 &&
          <div className="game-state text-center">
            It's a tie!
          </div>
        }
        {
          winner !== 2 &&
          <div className="game-state flex flex-col justify-center items-center">
            <div className="winner-name text-5xl sm:text-6xl flex flex-col items-center"> 
              <div className="winner-text mb-1">
                Winner:
              </div>
              <div className="winner flex justify-center items-center">
                <div className="player-name">
                  {players && winner !== undefined ? players[winner].name : ""}
                </div>
                <img className="max-h-20 sm:max-h-32" src={players && winner !== undefined ? players[winner].character.imageUrl : ""} alt="" />
              </div>
            </div>
          </div>
        }
      </div>
      <div className="stats card flex flex-col items-center text-xl sm:text-3xl mb-5 mx-auto p-4 w-fit">
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
      <div className="text-xl sm:text-3xl action-btns flex justify-center">
        <button 
          className="rematch btn rounded-lg py-2 w-28 sm:w-48 mr-3" 
          onClick={() => handleRematch() }
        >
          <i className="fa-regular fa-hand-point-left mr-2" />
          Rematch
        </button>
        <button 
          className="quit btn rounded-lg py-2 w-28 sm:w-48 mx-2" 
          onClick={() => dispatch(clearAll()) }
        >
          Quit
          <i className="fa-regular fa-hand-point-right mx-2" />
        </button>
      </div>

    </section>
  );
}

export default Results;
