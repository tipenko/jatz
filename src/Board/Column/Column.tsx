import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import { moveCard, addCard } from '../actionCreators';
import { ItemTypes } from '../../DNDConstants';
import { useDrop } from 'react-dnd';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import PlusOneIcon from '@material-ui/icons/PlusOne';


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
      <Typography variant="h6" gutterBottom>
        {name}
      </Typography>


      <DropZone index={0} />
      {cards.map((card, index: number) => (
        <>
          <Card cardObject={card} source={name} key={index}/>
          <DropZone index={index + 1} key={index} />
        </>
      ))}
      <IconButton color="primary" aria-label="add to shopping cart" onClick={addCardCallback}>
        <PlusOneIcon />
      </IconButton>
    </div>
  );
};

const mapDispatchToProps = {
  moveCard,
  addCard
};

export const Column = connect(null, mapDispatchToProps)(ColumnComponent);
