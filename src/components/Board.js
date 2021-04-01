import React from 'react';
import { BoardWrapper } from './styles/Board.styled';
import Column from './Column';

export default function Board({ grid }) {
  return (
    <BoardWrapper>
      {grid.map((cells, i) => (
        <Column key={i} colIndex={i} cells={cells} />
      ))}
    </BoardWrapper>
  );
}
