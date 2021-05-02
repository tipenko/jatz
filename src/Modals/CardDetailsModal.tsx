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
    marginLeft: 20,
  },
  inputs: {
    display: 'grid',
    gridTemplateRows: '2fr 4ft 4fr',
    gridGap: '10px',
  },
}));

const withChangeListener = (callback) => (event) =>
  callback(event.target.value);

const CardDetailsModal = ({
  cardId,
  history,
  card,
  updateCard,
  deleteCard,
}) => {
  const [description, setDescription] = useState(card && card.content);
  const [shortId, setShortId] = useState(card && card.shortId);
  const [resolution, setResolution] = useState(card && card.resolution);

  const descriptionChangeHandler = useCallback(
    withChangeListener(setDescription),
    [setDescription]
  );

  const shortIdChangeHandler = useCallback(withChangeListener(setShortId), [
    setShortId,
  ]);

  const resolutionChangeHandler = useCallback(
    withChangeListener(setResolution),
    [setResolution]
  );

  const closeCallback = useCallback(() => history.replace('/'));
  const submitCallback = useCallback(() => {
    //construct and dispatch event that will update our card object
    updateCard(cardId, description, resolution, shortId);
    history.replace('/');
  }, [description, resolution, shortId]);

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
        <div className={classes.inputs}>
          <TextField
            autoFocus
            fullWidth
            label="Short ID"
            onChange={shortIdChangeHandler}
            variant="outlined"
            value={shortId}
          />

          <TextField
            multiline
            autoFocus
            fullWidth
            rows={6}
            label="Description"
            onChange={descriptionChangeHandler}
            variant="outlined"
            value={description}
          />

          <TextField
            multiline
            autoFocus
            fullWidth
            rows={6}
            label="Resolution"
            onChange={resolutionChangeHandler}
            variant="outlined"
            value={resolution}
          />
        </div>

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
