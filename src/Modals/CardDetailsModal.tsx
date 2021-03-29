import React, { useState, useCallback, useMemo } from 'react';
import GenericModal from './GenericModal';
import { connect } from 'react-redux';
import { updateCard, deleteCard } from '../Board/actionCreators';
import LogEventTimeline from '../LogEventTimeline/index';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  historyContainer: {
    minWidth: 400,
  },
}));

const CardDetailsModal = ({
  cardId,
  history,
  card,
  updateCard,
  deleteCard,
}) => {
  const [value, setValue] = useState(card && card.content);
  const changeHandler = useCallback((event) => setValue(event.target.value), [
    setValue,
  ]);
  const closeCallback = useCallback(() => history.replace('/'));
  const submitCallback = useCallback(() => {
    //construct and dispatch event that will update our card object
    updateCard(cardId, value);
    history.replace('/');
  }, [value]);

  const extraButtons = useMemo(
    () => [
      {
        title: 'delete',
        callback: () => {
          deleteCard(cardId);
          history.replace('/kanban');
        },
      },
    ],
    [deleteCard, cardId]
  );

  const classes = useStyles();

  if (!card) return null;

  return (
    <GenericModal
      closeCallback={closeCallback}
      submitCallback={submitCallback}
      title="Update Card"
      extraButtons={extraButtons}
      submitTitle="Update"
    >
      <div className={classes.root}>
        <TextField
          multiline
          autoFocus
          fullWidth
          rows={12}
          label="Description"
          onChange={changeHandler}
          variant="outlined"
          value={value}
        />
        <div className={classes.historyContainer}>
          <LogEventTimeline logEvents={card.logRecords} />
        </div>
      </div>
    </GenericModal>
  );
};

export default connect(
  (state, { cardId }) => {
    const boards = state.board;
    let foundCard = null;
    if (!boards) {
      return {
        card: null,
      };
    }
    boards.forEach((board) =>
      board.cards.forEach((card) => {
        if (card.uid == cardId) {
          foundCard = card;
        }
      })
    );

    return {
      card: foundCard,
    };
  },
  {
    updateCard,
    deleteCard,
  }
)(CardDetailsModal);
