import React, { memo, useState } from 'react';
import { Wrapper } from './styles/ControlPanel.styled';

export default memo(function ControlPanel({
  setupGrid,
  results,
  startNewGame,
}) {
  const [gameProperties, setGameProperties] = useState({
    cells: 0,
    columns: 0,
    gamePoints: 0,
  });

  const inputOnChange = (input) => {
    setGameProperties({
      ...gameProperties,
      [input.target.name]: +input.target.value,
    });
  };

  const onPlayHandler = () => {
    setupGrid(gameProperties);
  };

  const playAgainHandler = () => {
    startNewGame();
  };

  if (results.finished) {
    return (
      <Wrapper>
        <div style={{ textAlign: 'center' }}>
          <h2 className="play_again">Game Finished</h2>
        </div>
        <div>
          <button onClick={playAgainHandler}>Play Again</button>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>
        <h2 className="title">Welcome to Tic Tac Toe Game</h2>
      </div>
      <div>
        <label>Select Width </label>
        <input type="number" name="columns" onChange={inputOnChange} />
      </div>
      <div>
        <label>Select Height </label>
        <input type="number" name="cells" onChange={inputOnChange} />
      </div>
      <div>
        <label>Choose poins </label>
        <input type="number" name="gamePoints" onChange={inputOnChange} />
      </div>
      <div>
        <button onClick={onPlayHandler}>Play</button>
      </div>
    </Wrapper>
  );
});
