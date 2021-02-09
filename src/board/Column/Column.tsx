import React from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import { moveCard } from '../actionCreators';
import { ItemTypes } from '../../DNDConstants';
import { useDrop } from 'react-dnd';

const ColumnComponent = ({ name, cards, moveCard }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => moveCard(item.id, item.source, name)
  });
  return (
    <div className="kanban-board-column" ref={drop}>
      <h2>{name}</h2>
      {cards.map((id) => (
        <Card id={id} source={name}/>
      ))}
    </div>
  );
};

const mapDispatchToProps = {
  moveCard,
}

export const Column = connect(null,mapDispatchToProps)(ColumnComponent);
