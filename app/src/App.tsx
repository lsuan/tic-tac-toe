import { useEffect, useState } from 'react';
import { changeTurn } from './features/turn/turnSlice';
import { useAppSelector, useAppDispatch } from "./states/hooks";
import CharacterSelect from './components/CharacterSelect';
import StartScreen from './components/StartScreen';
import Game from './components/Game';

import './App.css';
import Results from './components/Results';

function App() {

  const dispatch = useAppDispatch();  
  
  // randomly chooses starting player + sets game mode after player selects it
  // TODO: implement game mode selection screen
  useEffect( () => {
    const firstPlayer = Math.floor(Math.random() * 2);
    dispatch(changeTurn(firstPlayer));
  }, [dispatch]);

  const gameMode = useAppSelector((state) => state.board.gameMode);
  const players = useAppSelector((state) => state.board.players);
  const board = useAppSelector((state) => state.board.board);
  const turn = useAppSelector((state) => state.turn.value);
  const winner = useAppSelector((state) => state.board.winner);
  const winningCells = useAppSelector((state) => state.board.winningCells);
  const [canProceed, setCanProceed] = useState(false);

  // handles game state depending on mode
  // TODO: handle lint warnings
  useEffect( () => {
    if (!players) {
      return;
    }

    if (winner === undefined) {
      setCanProceed(false);
    }

    if (winner !== undefined) {
      for (const cell of winningCells) {
        const cellElement = document.querySelector(`.cell-${cell}`);
        cellElement?.setAttribute("style", "background-color: var(--yellow)");
      }
      setTimeout( () => setCanProceed(true), 1500 );
      return;
    }

    const aiMakeMove = () => {
      const aiOccupied = board.map((element, index) => element === 1 ? index : -1).filter((value) => value !== -1);
      const userOccupied = board.map((element, index) => element === 0 ? index : -1).filter((value) => value !== -1);
      let move = -1;
  
      if (board[4] === undefined) {
        move = 4;
      } else {
        const winningCombos = [
          [0, 1, 2],
          [0, 3, 6],
          [0, 4, 8],
          [1, 4, 7],
          [2, 4, 6],
          [2, 5, 8],
          [3, 4, 5],
          [6, 7, 8]
        ];
  
        const emptyCells = board.map((element, index) => element === undefined ? index : -1).filter((value) => value !== -1);
        const userCombosAvailable:Map<number, number[]> = new Map();
        for (let index = 0; index < winningCombos.length; index++) {
          let userCells = 0, occupied = 0;
          for (const cellNum of winningCombos[index]) {
            if (userOccupied.includes(cellNum)) {
              userCells++;
              occupied++;
            } else if (aiOccupied.includes(cellNum)) {
              occupied++;
            }
          }
  
          // this means that the user is close to winning
          if (userCells === 2 && occupied === 2) {
            userCombosAvailable.set(index, winningCombos[index]);
          }
        }
      
        // if the user is close to winning, then block them
        if (userCombosAvailable.size > 0) {
          for (const index of userCombosAvailable.keys()) {
            const winningCombo = winningCombos[index];
            for (const cellNum of winningCombo) {
              if (emptyCells.includes(cellNum) && !aiOccupied.includes(cellNum)) {
                const cell = document.querySelector(`.cell-${cellNum} button`) as HTMLElement;
                cell.click();
                userCombosAvailable.delete(index);
                return;
              }
            }
          }
        } else {
          // choose a cell to make ai win
          let availableMoves:Set<number> = new Set();
          if (aiOccupied.length > 0) {
            for (const aiIndex of aiOccupied) {
              const combosAvailable = winningCombos.map((combo) => combo.includes(aiIndex) ? combo : []).filter((value) => value.length > 0);
              
              for (const combo of combosAvailable) {
                for (const cellNum of combo) {
                  if (emptyCells.includes(cellNum) && !userOccupied.includes(cellNum)) {
                    availableMoves.add(cellNum);
                  }
                }  
              }
            }
          } 
          // ai is second player to start playing, so choose a random cell
          else {
            availableMoves = new Set([0, 1, 2, 3, 5, 6, 7, 8]);
          }
          const moves:number[] = Array.from(availableMoves);
          move = moves[Math.floor(Math.random() * moves.length)];
        }
      }
      const cell = document.querySelector(`.cell-${move} button`) as HTMLElement;
      cell.click();
    }

    if (gameMode === "pve" && turn === 1) {

      // if board is empty, then make ai start game a little after render
      if (board.every((cell) => cell === undefined)) {
        setTimeout( aiMakeMove, 250);
      } else {
        setTimeout( aiMakeMove, 750);
      }
    }
  }, [turn, players, board, gameMode, winner, winningCells]);

  return (
    <div className="App lg:container flex justify-center items-center p-3 lg:p-8 h-screen mx-auto">
      {
        !gameMode && <StartScreen />
      }
      {
        gameMode && !players && <CharacterSelect />
      }
      {
        gameMode && players && !canProceed && <Game canProceed={canProceed}/>
      }
      {
        gameMode && players && canProceed && <Results setCanProceed={setCanProceed}/>
      }
    </div>
  );
}

export default App;
