import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../DNDConstants';

const Card = ({ title }) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.CARD,
      title
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
      {title}
    </span>
  );
};

export default Card;
