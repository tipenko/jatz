import React from 'react';

export const Column = ({name, cards}) => {
  return <div className="kanban-board-column">
    <h2>{name}</h2>
    {cards.map((cardValue) => <span className="kanban-board-column-card">{cardValue}</span>)}
  </div>;
};
