import React, { useState, useCallback, useMemo } from 'react';
import GenericModal from './GenericModal';
import { connect } from 'react-redux';
import { updateCard, deleteCard } from '../Board/actionCreators';

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
        title: 'delete this card',
        callback: () => {
          deleteCard(cardId);
          history.replace('/');
        },
      },
    ],
    [deleteCard, cardId]
  );

  return (
    <GenericModal
      closeCallback={closeCallback}
      submitCallback={submitCallback}
      title="Mutate Card"
      extraButtons={extraButtons}
    >
      <textarea
        className="card-content-textarea"
        value={value}
        onChange={changeHandler}
      />
    </GenericModal>
  );
};

export default connect(
  (state, { cardId }) => {
    const boards = state.board;
    let foundCard = null;
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
