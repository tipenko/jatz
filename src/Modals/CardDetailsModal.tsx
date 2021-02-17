import React, { useState, useCallback } from 'react';
import GenericModal from './GenericModal';
import { connect } from 'react-redux';
import { updateCard } from '../Board/actionCreators';

const CardDetailsModal = ({ cardId, history, card, updateCard }) => {
  const [value, setValue] = useState(card.content);
  const changeHandler = useCallback(event => setValue(event.target.value), [setValue]);
  const closeCallback = useCallback(() => history.replace('/'));
  const submitCallback = useCallback(() => {
    //construct and dispatch event that will update our card object
    console.log('update value is', value);
    updateCard( cardId, value);
    history.replace('/')
  }, [value]);

  return (
    <GenericModal
      closeCallback={closeCallback}
      submitCallback={submitCallback}
    >
      <textarea value={value} onChange={changeHandler}/>
    </GenericModal>
  );
};

export default connect((state, { cardId }) => {
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
}, {
  updateCard
})(CardDetailsModal);
