import React, { memo, useContext } from 'react';

import Cell from './Cell';

import styled from 'styled-components';
import { GameScreenContext } from './Game';
const Wrapper = styled.div`
  .col_number {
    text-align: center;
  }
`;

export default memo(function Column({ cells, colIndex }) {
  const { results } = useContext(GameScreenContext);

  return (
    <Wrapper key={colIndex}>
      <div className="col_number">{colIndex}</div>
      {cells.map((cell, cellIndex) => {
        let winner = false;
        if (results.finished) {
          if (results.sign === cell) {
            winner = results.winner_coords.some((item) => {
              return item.col === colIndex && item.cell === cellIndex;
            });
          }
        }

        return (
          <>
            {/* <div>{cellIndex}</div> */}
            <Cell
              value={cell}
              winner={winner}
              key={cellIndex}
              coords={{ col: colIndex, cell: cellIndex }}
            />
          </>
        );
      })}
    </Wrapper>
  );
});
