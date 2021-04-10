import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import { moveCard, addCard } from '../actionCreators';
import { ItemTypes } from '../../DNDConstants';
import { useDrop } from 'react-dnd';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import generateTime from '../../utils/generateTime';

const archivationTimeout = 24 * 60 *  60 * 1000;//24hrs

const getDropZone = (targetName, moveCard) => ({
  index,
  isEmptyColumn = false,
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: ({ card, source }) => moveCard(card, source, targetName, index),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      className={`column-drop-zone ${isOver ? 'hovered' : ''} ${
        isEmptyColumn && 'empty-column'
      }`}
      ref={drop}
    />
  );
};

const ColumnComponent = ({ name, cards, moveCard, addCard }) => {
  const DropZone = useCallback(getDropZone(name, moveCard), [name, moveCard]);
  const addCardCallback = useCallback(() => addCard(name));
  const isEmptyColumn = !(cards && cards.length);
  const [currentTime] = useState(generateTime());
  const notArchiveColumn = name !== 'archived';
  const filteredCards = useMemo(() => {

    if (notArchiveColumn) {
      return cards;
    }

    return cards.filter((card) => {
      const archivationTime = card.archivationTime || 0;
      const difference = currentTime - archivationTime;
      return difference < archivationTimeout;
    });
  }, [name, cards, currentTime]);

  return (
    <div className="kanban-board-column" key={'column-div' + name}>
      <Typography variant="h6" gutterBottom>
        {name}
      </Typography>

      <DropZone index={0} isEmptyColumn={isEmptyColumn} />
      {filteredCards.map((card, index: number) => (
        <Fragment key={index}>
          <Card cardObject={card} source={name} />
          <DropZone index={index + 1} />
        </Fragment>
      ))}
      {notArchiveColumn && (
        <IconButton
          color="primary"
          aria-label="add to shopping cart"
          onClick={addCardCallback}
        >
          <PlusOneIcon />
        </IconButton>
      )}
    </div>
  );
};

const mapDispatchToProps = {
  moveCard,
  addCard,
};

export const Column = connect(null, mapDispatchToProps)(ColumnComponent);
