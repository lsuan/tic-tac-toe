import "../styles/character-select.scss";
import { characters } from "src/character";
import { useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "src/states/hooks";
import { setPlayers } from "src/features/board/boardSlice";
import Character from "src/character";

function CharacterSelect() {
  const textRef = useRef(null);
  const dispatch = useAppDispatch();
  const [userCharacter, setUserCharacter] = useState("");
  const gameMode = useAppSelector((state) => state.board.gameMode);

  
  const getRandomCharacter = () => {
    let characters = document.getElementsByClassName("character");
    const availableCharacters: Element[] = Array.from(characters).filter( (c) => c.classList[1] !== userCharacter );
    const character = characters[Math.floor(Math.random() * availableCharacters.length)];
    return character.classList[1];
  }

  const handleSubmit = () => {
    if (gameMode === "pve") {
      if (userCharacter === "" && textRef.current !== null) {
        const textElement: HTMLElement = textRef.current;
        textElement.innerHTML = "<div class='warning'>!! CHOOSE A CHARACTER !!</div>";
        return;
      }

      const aiCharacter = getRandomCharacter();
      const userChar: Character = characters[userCharacter as keyof object];
      const aiChar: Character = characters[aiCharacter as keyof object];
      
      const players = [
        { name: "You", character: userChar },
        { name: "AI", character: aiChar }
      ];

      dispatch(setPlayers(players));
    }
  }

  const onCharacterClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let character = undefined;
    const clicked = event.target;
    if (clicked instanceof HTMLElement) {
      if (clicked.parentElement?.classList.contains("character")) {
        character = clicked.parentElement?.classList[1];
      } else if (clicked.classList.contains("character")) {
        character = clicked.classList[1];
      }
    }
    if (textRef.current !== null && character) {
      const textElement: HTMLElement = textRef.current;
      if (character === "j-you") {
        character = "j.you";
      }
      setUserCharacter(character);
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
      <div className={`character ${props.name} flex flex-col items-center pt-1 md:pb-3 md:px-5 rounded`} onClick={onCharacterClick}>
        <img className="avatar" src={(characters[props.name as keyof object] as Character).imageUrl} alt=""/>
        <img className="name" src={(characters[props.name as keyof object] as Character).nameUrl} alt=""/>
      </div>
    );
  }

  return (
    <section id="character-select" className="m-auto w-11/12 md:w-10/12">
      <h1 className="title">
        Character Selection
      </h1>
      <div className="characters grid place-items-center gap-1 my-3 md:m-8">
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
      <div className="bottom-section flex flex-col items-center pt-3">
        <div ref={textRef} className="text-3xl flex mb-5"/>
        <button className="character-set btn rounded-lg w-48 py-2" onClick={handleSubmit}>Confirm</button>
      </div>
    </section>
  )
}

export default CharacterSelect;