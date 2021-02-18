import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import { moveCard, addCard } from '../actionCreators';
import { ItemTypes } from '../../DNDConstants';
import Button from '../../Button';
import { useDrop } from 'react-dnd';

const getDropZone = (targetName, moveCard) => ({ index }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: ({ card, source }) => moveCard(card, source, targetName, index),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div className={`column-drop-zone ${isOver ? 'hovered' : ''}`} ref={drop} />
  );
};

const ColumnComponent = ({ name, cards, moveCard, addCard }) => {
  const DropZone = useCallback(getDropZone(name, moveCard), [name, moveCard]);
  const addCardCallback = useCallback(() => addCard(name));

  return (
    <div className="kanban-board-column">
      <h2>{name}</h2>
      <DropZone index={0} />
      {cards.map((card, index: number) => (
        <>
          <Card cardObject={card} source={name} key={card.uid}/>
          <DropZone index={index + 1} />
        </>
      ))}
      <Button onClick={addCardCallback} title="+"/>
    </div>
  );
};

const mapDispatchToProps = {
  moveCard,
  addCard
};

export const Column = connect(null, mapDispatchToProps)(ColumnComponent);
