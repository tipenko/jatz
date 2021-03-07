import {
  MOVE_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  ADD_CARD,
  FINISH_ADD_CARD,
  CANCEL_ADD_CARD,
  SET_INITIAL_STATE,
} from './actionTypes';

const _r = (type, fn = (i) => i) => (...args) => ({
  type,
  payload: fn(...args),
});

export const moveCard = _r(MOVE_CARD, (card, source, target, index) => ({
  card,
  source,
  target,
  index,
}));

export const updateCard = _r(UPDATE_CARD, (cardUid, nextContent) => ({
  cardUid,
  nextContent,
}));

export const deleteCard = _r(DELETE_CARD, (cardUid) => ({
  cardUid,
}));

export const addCard = _r(ADD_CARD, (columnName) => ({
  columnName,
}));

export const finishAddCard = _r(
  FINISH_ADD_CARD,
  (columnName, uid, content) => ({
    uid,
    content,
    columnName,
  })
);

export const cancelAddCard = _r(CANCEL_ADD_CARD);

export const setInitialState = _r(SET_INITIAL_STATE);
