import React, { useState, useCallback, useMemo } from 'react';
import GenericModal from './GenericModal';
import { connect } from 'react-redux';
import { updateCard, deleteCard } from '../Board/actionCreators';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  historyContainer: {
    minWidth: 150,
  },
}));

const useStylesForMuiTimeline = makeStyles(
  {
    missingOppositeContent: {
      '&::before': { content: 'none' },
    },
  },
  { name: 'MuiTimelineItem' }
);

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
  const classes2 = useStylesForMuiTimeline();

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
          <Timeline>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Eat</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Code</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
              </TimelineSeparator>
              <TimelineContent>Sleep</TimelineContent>
            </TimelineItem>
          </Timeline>
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
