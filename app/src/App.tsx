import { useEffect } from 'react';
import './App.css';
import Board from './features/board/Board';
import { changeTurn } from './features/turn/turnSlice';
import { setBoard, setGameMode } from './features/board/boardSlice';
import { useAppSelector, useAppDispatch } from "./states/hooks";
import CharacterSelect from './components/CharacterSelect';


function App() {

  const dispatch = useAppDispatch();  
  
  // randomly chooses starting player + sets game mode after player selects it
  // TODO: implement game mode selection screen
  useEffect( () => {
    dispatch(setGameMode("pve"));
    const firstPlayer = Math.floor(Math.random() * 2);
    dispatch(changeTurn(firstPlayer));
  }, []);

  const gameMode = useAppSelector((state) => state.board.gameMode);
  const board = useAppSelector((state) => state.board.board);
  const turn = useAppSelector((state) => state.turn.value);
  const winner = useAppSelector((state) => state.board.winner);

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

      const userCombosAvailable:Map<number, number[]> = new Map();
      winningCombos.map((combos, index) => {
        const userCombo: number[] = [];
        for (const cellNum of combos) {
          if (userOccupied.includes(cellNum) && !aiOccupied.includes(cellNum)) {
            userCombo.push(cellNum);
          }
        }
        // if the user is close to winning, then the length of the combo is 2
        if (userCombo.length === 2) {
          userCombosAvailable.set(index, userCombo);
        }
      });

      // if the user is close to winning, then block them
      if (userCombosAvailable.size > 0) {
        userCombosAvailable.forEach((combo, index) => {
          const winningCombo = winningCombos[index];
          for (const cellNum of winningCombo) {
            if (!combo.includes(cellNum) && !aiOccupied.includes(cellNum)) {
              const cell = document.querySelector(`.cell-${cellNum} button`) as HTMLElement;
              cell.click();
              return;
            }
          }
        });
      } else {
        // choose a cell to make ai win
        let availableMoves:Set<number> = new Set();
        if (aiOccupied.length > 0) {
          for (const aiIndex of aiOccupied) {
            const combosAvailable = winningCombos.map((combo) => combo.includes(aiIndex) ? combo : []).filter((value) => value.length > 0);
            
            for (const combo of combosAvailable) {
              for (const cellNum of combo) {
                if (!aiOccupied.includes(cellNum) && !userOccupied.includes(cellNum)) {
                  availableMoves.add(cellNum);
                }
              }  
            }
          }
        } 
        // ai is second player to start playing, so choose a random cel
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

  // handles game state depending on mode
  useEffect( () => {
    if (winner !== undefined) {
      return;
    }

    if (turn === 1 && gameMode === "pve") {
      aiMakeMove();
    }
  }, [turn]);
   
  return (
    <div className="App md:container flex justify-center items-center mx-auto p-8 min-h-screen">
      <CharacterSelect />
      {/* <h1 className="app-title ">
        TIC TAC TOE
      </h1>
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
      </section> */}
    </div>
  );
}

export default App;
