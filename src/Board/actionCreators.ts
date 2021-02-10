import { MOVE_CARD } from './actionTypes';

export const moveCard = (id, source, target, index) => ({
  payload: { id, source, target, index},
  type: MOVE_CARD,
});
