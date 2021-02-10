import { MOVE_CARD } from './actionTypes';

export const moveCard = (card, source, target, index) => ({
  payload: { card, source, target, index},
  type: MOVE_CARD,
});
