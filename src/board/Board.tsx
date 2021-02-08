import React, { Fragment } from 'react';
import { Column } from './Column';

const columns = [
  { name: 'todo', cards: [11, 12] },
  { name: 'blocked', cards: [1, 2] },
  { name: 'in progress', cards: [15, 16] },
  { name: 'done', cards: [11, 12] },
];

export const Board = () => {
  return (
    <Fragment>
      <h1> kanban board </h1>
      <div className="kanban-board">
        {columns.map(({ name, cards }) => (
          <Column name={name} cards={cards} />
        ))}
      </div>
    </Fragment>
  );
};
