import React, { useState } from 'react';
import Square from './Square';
import start from '../sounds/start.mp3';
import turn from '../sounds/turn.mp3';
import win from '../sounds/win.mp3';

export default function Board() {
  const startAudio = new Audio(start);
  const turnAudio = new Audio(turn);
  const winAudio = new Audio(win);

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningSquares, setWinningSquares] = useState([]);

  function handleClick(i) {
    
    if (squares[i] || winner || isDisabled) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    turnAudio.play();

    const result = calculateWinner(nextSquares);
    if (result) {
      setWinner(result.winner);
      setWinningSquares(result.line);
      winAudio.play();
    }
  }

  function calculateWinner(squares) {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }
    return null;
  }

  function handleStart() {
    setIsDisabled(false);
    startAudio.play();
  }

  function handleQuit() {
    setIsDisabled(true);
    setSquares(Array(9).fill(null));
    setWinner(null);
    setWinningSquares([]);
    startAudio.play();
  }

  let status;
  let symbol;

  if (!isDisabled) {
    if (winner) {
      status = 'Winner: ';
      symbol = winner;
    } else if (squares.includes(null)) {
      status = 'Player: ';
      symbol = xIsNext ? 'X' : 'O';
    } else {
      status = 'Draw';
      winAudio.play();
    }
  } else {
    status = 'Tic Tac Toe';
  }

  return (
    <>
        
      <div
        className="board-component"
        style={{
          background: winner ? 'rgba(255,80,80,0.3)' : 'rgba(255, 255, 255, 0.05)',
        }}
      >
        <div className="status">
          {status} <span className="symbol">{symbol}</span>
        </div>
        <div className="board">
          <div className="board-row" style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}>
            <Square
              className={winningSquares.includes(0) ? 'highlight' : ''}
              isDisabled={isDisabled}
              value={squares[0]}
              onSquareClick={() => handleClick(0)}
            />
            <Square
              className={winningSquares.includes(1) ? 'highlight' : ''}
              isDisabled={isDisabled}
              value={squares[1]}
              onSquareClick={() => handleClick(1)}
            />
            <Square
              className={winningSquares.includes(2) ? 'highlight' : ''}
              isDisabled={isDisabled}
              value={squares[2]}
              onSquareClick={() => handleClick(2)}
            />
          </div>
          <div className="board-row" style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}>
            <Square
              className={winningSquares.includes(3) ? 'highlight' : ''}
              isDisabled={isDisabled}
              value={squares[3]}
              onSquareClick={() => handleClick(3)}
            />
            <Square
              className={winningSquares.includes(4) ? 'highlight' : ''}
              isDisabled={isDisabled}
              value={squares[4]}
              onSquareClick={() => handleClick(4)}
            />
            <Square
              className={winningSquares.includes(5) ? 'highlight' : ''}
              isDisabled={isDisabled}
              value={squares[5]}
              onSquareClick={() => handleClick(5)}
            />
          </div>
          <div className="board-row" style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}>
            <Square
              className={winningSquares.includes(6) ? 'highlight' : ''}
              isDisabled={isDisabled}
              value={squares[6]}
              onSquareClick={() => handleClick(6)}
            />
            <Square
              className={winningSquares.includes(7) ? 'highlight' : ''}
              isDisabled={isDisabled}
              value={squares[7]}
              onSquareClick={() => handleClick(7)}
            />
            <Square
              className={winningSquares.includes(8) ? 'highlight' : ''}
              isDisabled={isDisabled}
              value={squares[8]}
              onSquareClick={() => handleClick(8)}
            />
          </div>
        </div>
        <div className="button-div">
          <button
            disabled={!isDisabled}
            className={`start btn ${isDisabled ? 'btn-success' : 'btn-dark'} px-5`}
            onClick={handleStart}
          >
            Start
          </button>
          <button
            disabled={isDisabled}
            className={`start btn ${!isDisabled ? 'btn-danger' : 'btn-dark'} px-5`}
            onClick={handleQuit}
          >
            Clear
          </button>
        </div>
      </div>
    </>
  );
}
