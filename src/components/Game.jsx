import { useState, useEffect } from "react";
import Board from "./Board";

function Game() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  useEffect(() => {
    if (!isXNext && !calculateWinner(board)) {
      makeAIMove();
    }
  }, [isXNext]);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board) || !isXNext) return;

    const newBoard = board.slice();
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsXNext(false);
  };

  const makeAIMove = () => {
    const bestMove = findBestMove(board);
    if (bestMove !== undefined) {
      const newBoard = board.slice();
      newBoard[bestMove] = "O";
      setBoard(newBoard);
      setIsXNext(true);
    }
  };

  const findBestMove = (board) => {
    let bestScore = -Infinity;
    let move;
    board.forEach((square, i) => {
      if (square === null) {
        board[i] = "O";
        const score = minimax(board, 0, false);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    });
    return move;
  };

  const minimax = (newBoard, depth, isMaximizing) => {
    const winner = calculateWinner(newBoard);
    if (winner === "O") return 10 - depth;
    if (winner === "X") return depth - 10;
    if (!newBoard.includes(null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      newBoard.forEach((square, i) => {
        if (square === null) {
          newBoard[i] = "O";
          bestScore = Math.max(bestScore, minimax(newBoard, depth + 1, false));
          newBoard[i] = null;
        }
      });
      return bestScore;
    } else {
      let bestScore = Infinity;
      newBoard.forEach((square, i) => {
        if (square === null) {
          newBoard[i] = "X";
          bestScore = Math.min(bestScore, minimax(newBoard, depth + 1, true));
          newBoard[i] = null;
        }
      });
      return bestScore;
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? "X" : "O"}`;

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-y-4">
      <h1 className="text-4xl font-bold text-blue-500 text-center">
        Tic Tac Toe
      </h1>
      <h2 className="text-2xl font-bold mb-4">{status}</h2>
      <Board squares={board} onClick={handleClick} />
      <button
        onClick={() => {
          setBoard(Array(9).fill(null));
          setIsXNext(true);
        }}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Restart Game
      </button>
    </div>
  );
}

export default Game;
