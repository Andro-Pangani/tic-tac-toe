import React, { createContext, useCallback, useEffect, useState } from 'react';
import { checkForWinner } from '../lib/checkWinner';
import Board from './Board';
import ControlPanel from './ControlPanel';

import styled from 'styled-components';

export const GameScreenContext = createContext();

export default function Game() {
  const [grid, setGrid] = useState(null);
  const [points, setPoints] = useState(3);
  const [player, setPlayer] = useState(null);
  const [results, setResults] = useState({
    finished: false,
    sign: null,
    winner_coords: [],
  });

  // * Counts if any moves are [possible] to check for *DRAW
  const [movesLeft, setMovesLeft] = useState(null);

  const setupGrid = useCallback((gamePropeties) => {
    let { columns, cells, gamePoints } = gamePropeties;

    setMovesLeft(columns * cells);

    console.log(gamePropeties, ' grid setup ');
    // setClicksCounter();
    // grid width
    let newSize = Array(columns)
      .fill(null) // grid height
      .map((item) => Array(cells).fill(null));
    setGrid(newSize);
    setPoints(gamePoints);
  }, []);

  // * Updates grid from <Cell /> component
  // * With Clicking on it
  const updateGrid = (coords, sign) => {
    setMovesLeft(movesLeft - 1);

    // mutates grid copy
    let newGrid = [...grid];
    newGrid[coords.col][coords.cell] = sign;

    // sets current player for checking
    setPlayer({
      coords: {
        col: coords.col,
        cell: coords.cell,
      },
      sign: sign,
    });

    // updates grid
    setGrid(newGrid);
  };

  const newGame = () => {
    setResults({
      finished: false,
      sign: null,
      sinner_coords: [],
    });
    setGrid(null);
    setPlayer(null);
  };

  useEffect(() => {
    if (player) {
      let column = grid[player.coords.col];
      let cell = player.coords.cell;

      if (grid.length) {
        let checked = checkForWinner(
          grid,
          column,
          cell,
          player,
          points,
          movesLeft
        );

        if (checked?.finished) {
          setResults(checked);
        }
      }
    }
  }, [grid]);

  return (
    <Wrapper>
      <ControlPanel
        setupGrid={setupGrid}
        results={results}
        startNewGame={newGame}
      />
      {results.finished ? (
        <>
          {results.sign === 'Draw' ? (
            <h3 className="result_sign"> Draw !</h3>
          ) : (
            <h3 className="winner_title">
              Winner is {<span className="result_sign">{results.sign}</span>}
            </h3>
          )}
        </>
      ) : null}
      {/* IF SIZE IS SET RENDER BOARD */}
      {grid && (
        <GameScreenContext.Provider value={{ updateGrid, results }}>
          <Board grid={grid} gameResults={results} />
        </GameScreenContext.Provider>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: gray;
  width: 100%;
  height: 100vh;
  background: #151515;
  font-family: 'Courier New', Courier, monospace;

  .winner_title {
    color: #3386ad;
    background-color: rgb(88, 31, 171);
    padding: 3px 8px;
    border: 1px solid #4e480c;
    border-radius: 3px;
  }
  .finished_title {
    color: #6060d2;
  }

  .result_sign {
    color: #ce93d2ed;
    font-family: cursive;
  }
`;
