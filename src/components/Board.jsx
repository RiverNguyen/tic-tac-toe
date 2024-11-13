/* eslint-disable react/prop-types */
import Square from "./Square";

const Board = ({ squares, onClick }) => (
  <div className="grid grid-cols-3 gap-2 w-64">
    {squares.map((square, i) => (
      <Square key={i} value={square} onClick={() => onClick(i)} />
    ))}
  </div>
);

export default Board;
