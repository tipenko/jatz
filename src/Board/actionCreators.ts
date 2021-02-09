import { MOVE_CARD } from './actionTypes';

export const moveCard = (id, source, target) => ({
  payload: { id, source, target},
  type: MOVE_CARD,
});
