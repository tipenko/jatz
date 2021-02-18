import { MOVE_CARD, UPDATE_CARD, DELETE_CARD, ADD_CARD, FINISH_ADD_CARD, CANCEL_ADD_CARD } from './actionTypes';

export const moveCard = (card, source, target, index) => ({
  payload: { card, source, target, index},
  type: MOVE_CARD,
});

export const updateCard = (cardUid, nextContent) => ({
  payload: { cardUid, nextContent},
  type: UPDATE_CARD,
});

export const deleteCard = (cardUid) => ({
  payload: {cardUid},
  type: DELETE_CARD
});

export const addCard = (columnName) => ({
  type: ADD_CARD,
  payload: {columnName}
});

export const finishAddCard = (columnName, uid, content) => ({
  type: FINISH_ADD_CARD,
  payload: {
    uid,
    content,
    columnName
  }
});

export const cancelAddCard = () => ({
  type: CANCEL_ADD_CARD
});
