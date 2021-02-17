import React from 'react';
import { useDrag } from 'react-dnd';
import { Link } from 'react-router-dom';
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
      <Link to={`/cardDetails/${cardObject.uid}/`}>
        {cardObject.content}
      </Link>
    </span>
  );
};

export default Card;
