import Cell from "../Cell";
import "src/styles/board.scss";

function Board() {
  const cells = [...Array(9).keys()];
  return (
    <div id="board" className="rounded grid grid-rows-3 grid-cols-3 w-fit mx-auto">
      {
        cells.map((number, i) => {
          return <div className="w-fit h-fit" key={number}>
            <Cell {...{number}} />
          </div>
        })
      }
    </div>
  );
}

export default Board;