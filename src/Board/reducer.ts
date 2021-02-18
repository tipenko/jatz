import find from 'lodash/find';
import {
  MOVE_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  FINISH_ADD_CARD,
} from './actionTypes';
import filter from 'lodash/filter';
import CardObject from '../types/CardObject';

const one = new CardObject(1, 'one');
const two = new CardObject(2, 'two');
const three = new CardObject(3, 'three');
const four = new CardObject(4, 'four');
const five = new CardObject(5, 'five');
const six = new CardObject(6, 'six');
const seven = new CardObject(7, 'seven');
const eight = new CardObject(8, 'eight');

const initialState = [
  { name: 'todo', cards: [one, two] },
  { name: 'blocked', cards: [three, four] },
  { name: 'in progress', cards: [five, six] },
  { name: 'done', cards: [seven, eight] },
];

const getUidMatcher = (uid, matchNonEqual = false) => (card) =>
  matchNonEqual ? card.uid != uid : card.uid == uid;
const removeCard = (array, card) =>
  filter(array, getUidMatcher(card.uid, true));
const insertCardInPosition = (array, card, index) => [
  ...array.slice(0, index),
  card,
  ...array.slice(index),
];
const replaceCard = (array, oldCard, newCard) =>
  array.map((card) => {
    if (oldCard.uid == card.uid) {
      return newCard;
    }

    return card;
  });

const deleteCard = (array, cardUid) =>
  array.filter((card) => card.uid != cardUid);

export default (state = initialState, action) => {
  switch (action.type) {
    case MOVE_CARD:
      const { source, card, target, index } = action.payload;
      const isReordering = source == target;

      const nextState = state.map((item) => {
        if (item.name == source) {
          if (isReordering) {
            return {
              name: item.name,
              cards: insertCardInPosition(
                removeCard(item.cards, card),
                card,
                index
              ),
            };
          }

          return {
            name: item.name,
            cards: removeCard(item.cards, card),
          };
        } else if (item.name == target) {
          return {
            name: item.name,
            cards: insertCardInPosition(item.cards, card, index),
          };
        } else return item;
      });

      return nextState;

    case UPDATE_CARD:
      const { cardUid, nextContent } = action.payload;

      const updatedState = state.map((column) => {
        const cardToMutate = find(column.cards, (card) => card.uid == cardUid);
        if (!cardToMutate) return column;
        return {
          name: column.name,
          cards: replaceCard(
            column.cards,
            cardToMutate,
            new CardObject(cardToMutate.uid, nextContent)
          ),
        };
      });

      return updatedState;

    case DELETE_CARD:
      const { cardUid: deletedCardUid } = action.payload;

      const deletedState = state.map((column) => {
        const cardToMutate = find(
          column.cards,
          (card) => card.uid == deletedCardUid
        );
        if (!cardToMutate) return column;
        return {
          name: column.name,
          cards: deleteCard(column.cards, deletedCardUid),
        };
      });

      return deletedState;

    case FINISH_ADD_CARD:
      const {
        uid: addingUid,
        content: addingContent,
        columnName: addingToColumn,
      } = action.payload;

      const addedState = state.map((column) => {
        if (column.name != addingToColumn) {
          return column;
        }

        return {
          name: column.name,
          cards: column.cards.concat(new CardObject(addingUid, addingContent)),
        };
      });
      return addedState;

    default:
      return state;
  }
  return state;
};
