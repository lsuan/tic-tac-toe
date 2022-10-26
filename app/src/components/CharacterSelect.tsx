import "../styles/character-select.scss";
import { characters } from "src/character";
import { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "src/states/hooks";
import { setPlayers, clearAll } from "src/features/board/boardSlice";
import { setPvPPlayers } from "src/features/onlineRoom/onlineRoomSlice";
import Character from "src/character";
import gameService from "src/services/gameService";
import { Socket } from "socket.io-client";
import socketService from "src/services/socketService";

type CharacterSelectProps = {
  roomId: string,
}

function CharacterSelect(roomId: CharacterSelectProps) {
  console.log(roomId);
  const textRef = useRef(null);
  const dispatch = useAppDispatch();
  const gameMode = useAppSelector((state) => state.board.gameMode);

  useEffect( () => {
    setRandomRotate();
  }, []);
  
  const setRandomRotate = () => {
    const characterImages = document.querySelectorAll(".character .avatar");
    const nameImages = document.querySelectorAll(".character .name");
    
    for (let i = 0; i < 9; i++) {
      const charRotate = Math.floor( (Math.random() + 5) * 2 );
      const nameRotate = Math.floor( (Math.random() + 5) * 2 );
      characterImages[i].setAttribute("style", `rotate: ${charRotate}deg`);
      characterImages[i].setAttribute("style", `rotate: ${charRotate}deg`);
      nameImages[i].setAttribute("style", `rotate: ${nameRotate}deg`);
    }
  }
  
  const getRandomCharacter = (userCharacter: string) => {
    let characters = document.getElementsByClassName("character");
    const availableCharacters: Element[] = Array.from(characters).filter( (c) => c.classList[1] !== userCharacter );
    const character = availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
    return character.classList[1];
  }

  const handleSubmit = () => {
    const userCharacter = document.querySelector(".selected")?.classList[1] || "";
    if (!userCharacter && textRef.current !== null) {
      const textElement: HTMLElement = textRef.current;
      textElement.innerHTML = "<div class='warning card p-4'>!! CHOOSE A CHARACTER !!</div>";
      return;
    }

    if (gameMode === "pve") {
      const aiCharacter = getRandomCharacter(userCharacter);
      const userChar: Character = characters[userCharacter as keyof object];
      const aiChar: Character = characters[aiCharacter as keyof object];
      const userPlayer = [ { name: "You", character: userChar} ];
      const aiPlayer = [ { name: "AI", character: aiChar} ];
      dispatch(setPlayers(userPlayer));
      dispatch(setPlayers(aiPlayer));
    } else { // TODO: REDO GAME START 
      console.log("pvp");
      if (socketService.socket && roomId.roomId !== "") {
        const userChar: Character = characters[userCharacter as keyof object];
        const player = { name: "", character: userChar } 
        socketService.socket.emit("setup_game", { roomId, player })
        // gameService.onStartGame(socketService.socket, (player) => {
        //   player.character = userChar;
        //   console.log(player);
        //   dispatch(setPlayers([player]));
        // });
      }
    }
  }

  const onCharacterClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let character = undefined;
    const clicked = event.target;
    document.querySelector(".selected")?.classList.remove("selected");
    
    if (clicked instanceof HTMLElement) {
      if (clicked.parentElement?.classList.contains("character")) {
        clicked.parentElement?.classList.add("selected");
        character = clicked.parentElement?.classList[1];
      } else if (clicked.classList.contains("character")) {
        character = clicked.classList[1];
        clicked.parentElement?.classList.add("selected");
      }
    }
    
    if (textRef.current !== null && character) {
      const textElement: HTMLElement = textRef.current;
      textElement.classList.add("p-4");
      if (character === "j-you") {
        character = "j.you";
      }
      textElement.innerHTML = `
        <div class="selected mr-2">SELECTED:</div>
        <div class="character-name">${character}</div>`;
    }
    
  }

  type CharacterProps = {
    name: string;
  }

  function Character( props: CharacterProps ) {
    return (
      <div className={`character ${props.name} flex flex-col items-center pt-1 w-full md:pb-3 md:px-5 rounded`} onClick={onCharacterClick}>
        <img className="avatar w-20 h-20 md:w-32 md:h-auto" src={(characters[props.name as keyof object] as Character).imageUrl} alt=""/>
        <img className="name w-16 h-12 md:w-24 md:auto" src={(characters[props.name as keyof object] as Character).nameUrl} alt=""/>
      </div>
    );
  }

  return (
    <section id="character-select" className="m-auto w-11/12 md:w-10/12">
      <h1 className="title">
        Character Selection
      </h1>
      <div className="characters grid place-items-center gap-1 my-5 md:m-8">
        <Character name="donggeon"/>
        <Character name="chan"/>
        <Character name="jisu"/>
        <Character name="jaeyun"/>
        <Character name="j.you"/>
        <Character name="kyungho"/>
        <Character name="daigo"/>
        <Character name="renta"/>
        <Character name="yeojeong"/>
      </div>
      <div className="bottom-section flex flex-col items-center pb-10">
        <div ref={textRef} className="card text-xl sm:text-3xl flex mb-4"/>
        <div className="action-btns text-xl sm:text-3xl">
          <button className="btn rounded-lg w-28 sm:w-48 py-2 mx-2" onClick={() => dispatch(clearAll())}>
            <i className="fa-regular fa-hand-point-left mr-2" />
            Back
          </button>
          <button className="character-set btn rounded-lg w-28 sm:w-48 py-2 mx-2" onClick={handleSubmit}>
            Confirm
            <i className="fa-regular fa-hand-point-right ml-2" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default CharacterSelect;