import "../styles/character-select.scss";
import { characters } from "src/character";
import { useRef } from "react";

function CharacterSelect() {
  const textRef = useRef(null);

  const onCharacterClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let character = undefined;
    if (event.target instanceof HTMLElement) {
      character = event.target.parentElement?.classList[1].toUpperCase();
    }
    console.log(character);
    if (textRef.current !== null) {
      const textElement: HTMLElement = textRef.current;
      if (character === "J-YOU") {
        character = "J.YOU";
      }
      textElement.innerHTML = `
        <div class="selected mr-2">SELECTED:</div>
        <div class="character-name">${character}</div>`;
    }
    
  }
  return (
    <section id="character-select" className="m-auto w-11/12 md:w-10/12">
      <h1 className="title">
        Character Selection
      </h1>
      <div className="characters grid place-items-center gap-1 my-3 md:m-5">
        <button className="character donggeon flex flex-col items-center pt-1 md:pb-3 md:px-5 rounded" onClick={onCharacterClick}>
          <img className="avatar" src={characters.Donggeon.imageUrl} alt=""/>
          <img className="name" src={characters.Donggeon.nameUrl} alt=""/>
        </button>
        <button className="character chan flex flex-col items-center p-1 md:pb-3 md:px-5 rounded" onClick={onCharacterClick}>
          <img className="avatar" src={characters.Chan.imageUrl} alt=""/>
          <img className="name" src={characters.Chan.nameUrl} alt=""/>
        </button>
        <button className="character jisu flex flex-col items-center p-1 md:pb-3 md:px-5 rounded" onClick={onCharacterClick}>
          <img className="avatar" src={characters.Jisu.imageUrl} alt=""/>
          <img className="name" src={characters.Jisu.nameUrl} alt=""/>
        </button>
        <button className="character jaeyun flex flex-col items-center p-1 md:pb-3 md:px-5 rounded" onClick={onCharacterClick}>
          <img className="avatar" src={characters.Jaeyun.imageUrl} alt=""/>
          <img className="name md:scale-150" src={characters.Jaeyun.nameUrl} alt=""/>
        </button>
        <button className="character j-you flex flex-col items-center p-1 md:pb-3 md:px-5 rounded" onClick={onCharacterClick}>
          <img className="avatar" src={characters["J.You"].imageUrl} alt=""/>
          <img className="name" src={characters["J.You"].nameUrl} alt=""/>
        </button>
        <button className="character kyungho flex flex-col items-center p-1 md:pb-3 md:px-5 rounded" onClick={onCharacterClick}>
          <img className="avatar" src={characters.Kyungho.imageUrl} alt=""/>
          <img className="name" src={characters.Kyungho.nameUrl} alt=""/>
        </button>
        <button className="character daigo flex flex-col items-center p-1 md:pb-3 md:px-5 rounded" onClick={onCharacterClick}>
          <img className="avatar" src={characters.Daigo.imageUrl} alt=""/>
          <img className="name" src={characters.Daigo.nameUrl} alt=""/> 
        </button>
        <button className="character renta flex flex-col items-center p-1 md:pb-3 md:px-5 rounded" onClick={onCharacterClick}>
          <img className="avatar" src={characters.Renta.imageUrl} alt=""/>
          <img className="name" src={characters.Renta.nameUrl} alt=""/>
        </button>
        <button className="character yeojeong flex flex-col items-center p-1 md:pb-3 md:px-5 rounded" onClick={onCharacterClick}>
          <img className="avatar" src={characters.Yeojeong.imageUrl} alt=""/>
          <img className="name" src={characters.Yeojeong.nameUrl} alt=""/>
        </button>
      </div>
      <div className="bottom-section flex flex-col items-center pt-3">
        <div ref={textRef} className="text flex mb-3"/>
        <button className="character-set btn rounded-lg px-5 py-2">Confirm</button>
      </div>
    </section>
  )
}

export default CharacterSelect;