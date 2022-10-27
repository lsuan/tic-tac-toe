import { useEffect, useState } from "react";
import { setGameMode } from "src/features/board/boardSlice";
import { useAppDispatch } from "../states/hooks";
import "../styles/start-screen.scss";

function StartScreen() {
  const dispatch = useAppDispatch();
  const [currentLetter, setCurrentLetter] = useState("E");

  useEffect( () => {
    setTimeout(titleType, 1500);
  });

  const titleType = () => {  
    const letterSpan = document.querySelector("h1 span");
    
    if (letterSpan) {
      if (currentLetter === "E") {
        setCurrentLetter("I");
        letterSpan.innerHTML = "1";
        
      } else {
        setCurrentLetter("E");
        letterSpan.innerHTML = "E";
      }
    }
  }

  return (
    <section id="start-screen" className="w-full flex flex-col items-center">
      <h1 className="app-title mx-4 mb-20 md:mb-40 text-5xl md:text-8xl">
        TIC TAC TO
        <span>E</span>
      </h1>
      <div className="game-modes mx-8 md:mx-20 flex justify-center">
        <button 
          className="menu-btn pve text-3xl md:text-5xl mb-12 md:mb-28 p-2 -rotate-6"
          onClick={() => dispatch(setGameMode("pve"))}
        >
          PLAY AGAINST AI
        </button>
        {/* <button 
          className="menu-btn pvp text-3xl md:text-5xl mt-12 md:mt-28 p-2 rotate-6"
          onClick={() => dispatch(setGameMode("pvp"))}
        >
          CREATE ONLINE ROOM
        </button> */}
      </div>
      <div className="absolute bottom-5 disclaimer text-center text-base px-10 md:px-32">
        !! I do not own the assets displayed here. Artist face images and name images belong to WakeOne Entertainment. !!
      </div>
    </section>
  );
}

export default StartScreen;