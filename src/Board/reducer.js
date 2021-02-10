import { MOVE_CARD } from './actionTypes';
import findIndex from 'lodash/findIndex';
import min from 'lodash/min';
import max from 'lodash/max';
import without from 'lodash/without';

const initialState = [
  { name: 'todo', cards: [1, 2] },
  { name: 'blocked', cards: [3, 4] },
  { name: 'in progress', cards: [5, 6] },
  { name: 'done', cards: [7, 8] },
];

export default (state = initialState, action) => {
  switch (action.type) {
    case MOVE_CARD:
      const {source, id, target, index} = action.payload;
      const isReordering = source==target;

      const nextState = state.map(item => {
         if (item.name == source) {
           if (isReordering) {
             const cardsWithoutMoved = without(item.cards, id)
             const nextCards = [...cardsWithoutMoved.slice(0, index), id, ...cardsWithoutMoved.slice(index)]

             return {
               name: item.name,
               cards: nextCards
             }
           }

           return {
             name: item.name,
             cards: without(item.cards, id)
           }
         } else if (item.name == target) {
             return {
               name: item.name,
               cards: [...item.cards.slice(0, index), id, ...item.cards.slice(index)]
             }
         } else return item;
      });

      return nextState;

    default:
      return state;
  }
  return state
};


