import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../DNDConstants';

const Card = ({ cardObject, source }) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.CARD,
      card: cardObject,
      source
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <span
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="kanban-board-column-card"
    >
      {cardObject.content}
    </span>
  );
};

export default Card;
