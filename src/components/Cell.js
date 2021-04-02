import React, { memo, useContext, useRef } from 'react';
import { GameScreenContext } from './Game';

export default memo(function Cell({ value, coords, winner }) {
  const timeout = useRef(null);
  const clicks = useRef(0);

  const { updateGrid } = useContext(GameScreenContext);

  const clickHandler = () => {
    if (value == null) {
      timeout.current && clearTimeout(timeout.current);
      clicks.current = clicks.current + 1;
      timeout.current = setTimeout(() => {
        if (!value) {
          let sign = clicks.current % 2 === 0 ? 'O' : 'X';
          // change grid
          updateGrid(coords, sign);
        }

        clicks.current = 0;
      }, 200);
    }
  };

  return (
    <div
      style={
        winner
          ? { ...style, backgroundColor: 'rgb(88 31 171)', color: '#3ed2c4' }
          : style
      }
      onClick={clickHandler}
    >
      {value}
    </div>
  );
});

const style = {
  margin: '5px',
  backgroundColor: 'rgb(20 25 27)',
  border: '1px solid #68586b',
  borderTopColor: 'rgb(177 142 185)',
  borderRadius: '3px',
  minHeight: '25px',
  minWidth: '25px',
  cursor: 'pointer',
  textAlign: 'center',
  color: 'rgb(137 212 255)',
  fontSize: '20px',
  fontFamily: 'cursive',
};
