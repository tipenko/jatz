import { MOVE_CARD, UPDATE_CARD, DELETE_CARD } from './actionTypes';

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
