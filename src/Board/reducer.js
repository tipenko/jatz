import { MOVE_CARD } from './actionTypes';
import findIndex from 'lodash/findIndex';
import min from 'lodash/min';
import max from 'lodash/max';
import without from 'lodash/without';

const initialState = [
  { name: 'todo', cards: [11, 12] },
  { name: 'blocked', cards: [1, 2] },
  { name: 'in progress', cards: [15, 16] },
  { name: 'done', cards: [13, 12] },
];

export default (state = initialState, action) => {
  switch (action.type) {
    case MOVE_CARD:
      const {source, id, target} = action.payload;
      if (source==target) return state;
      const nextState = state.map(item => {
         if (item.name == source) {
           return {
             name: item.name,
             cards : without(item.cards, id)
           }
         } else if (item.name == target) {
             return {
               name: item.name,
               cards: [...item.cards, id]
             }
         } else return item;
      });

      return nextState;

    default:
      return state;
  }
  return state
};
