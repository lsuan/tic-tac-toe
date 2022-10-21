import { setGameMode } from "src/features/board/boardSlice";
import { useAppDispatch } from "../states/hooks";
import "../styles/start-screen.scss";

function StartScreen() {
  const dispatch = useAppDispatch();

  return (
    <section id="start-screen" className="w-full flex flex-col items-center">
      <h1 className="app-title mx-4 mb-20 md:mb-40 text-5xl md:text-8xl">
        TIC TAC TOE
      </h1>
      <div className="game-modes mx-8 md:mx-20 flex justify-center">
        <button 
          className="pve text-3xl md:text-5xl mb-12 md:mb-28 px-2 -rotate-6"
          onClick={() => dispatch(setGameMode("pve"))}
        >
          PLAY AGAINST AI
        </button>
        <button 
          className="pvp text-3xl md:text-5xl mt-12 md:mt-28 px-2 rotate-6"
          onClick={() => dispatch(setGameMode("pvp"))}
        >
          CREATE ONLINE ROOM
        </button>
      </div>
    </section>
  );
}

export default StartScreen;