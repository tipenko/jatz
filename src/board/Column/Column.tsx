import React from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import { moveCard } from '../actionCreators';
import { ItemTypes } from '../../DNDConstants';
import { useDrop } from 'react-dnd';

const getDropZone = (targetName, moveCard) => ({index}) => {
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: ({card, source})=> moveCard(card, source, targetName, index)
  });

  return <div className="column-drop-zone" ref={drop}/>
}

const ColumnComponent = ({ name, cards, moveCard }) => {
 const DropZone = getDropZone(name, moveCard);
  return (
    <div className="kanban-board-column">
      <h2>{name}</h2>
      <DropZone index={0}/>
      {cards.map((card, index:number) => (
        <>
        <Card cardObject={card} source={name}/>
        <DropZone index={index+1}/>
        </>
      ))}
    </div>
  );
};

const mapDispatchToProps = {
  moveCard,
}

export const Column = connect(null, mapDispatchToProps)(ColumnComponent);
