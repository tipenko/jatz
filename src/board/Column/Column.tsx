import React from 'react';
import Card from './Card';
import { ItemTypes } from '../../DNDConstants';
import { useDrop } from 'react-dnd';

export const Column = ({ name, cards }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) =>
      console.log(`item ${item.title} is dropped into ${name}`),
  });
  return (
    <div className="kanban-board-column" ref={drop}>
      <h2>{name}</h2>
      {cards.map((cardValue) => (
        <Card title={cardValue} />
      ))}
    </div>
  );
};
