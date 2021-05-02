import find from 'lodash/find';
import {
  MOVE_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  FINISH_ADD_CARD,
  SET_INITIAL_STATE,
} from './actionTypes';
import filter from 'lodash/filter';
import CardObject, {addLogRecord} from '../types/CardObject';

const defaultState = false;

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

export default (state = defaultState, { type, payload, eventLogRecord }) => {
  const add = addLogRecord(eventLogRecord);
  switch (type) {
    case MOVE_CARD:
      const { source, card, target, index } = payload;
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
            cards: insertCardInPosition(item.cards, add(card), index),
          };
        } else return item;
      });

      return nextState;

    case UPDATE_CARD:
      const { cardUid, nextContent, nextShortId, nextResolution } = payload;

      const updatedState = state.map((column) => {
        const cardToMutate = find(column.cards, (card) => card.uid == cardUid);
        if (!cardToMutate) return column;
        return {
          name: column.name,
          cards: replaceCard(
            column.cards,
            cardToMutate,
            add(new CardObject(cardToMutate.uid, nextShortId, nextResolution, nextContent, cardToMutate.logRecords))
          ),
        };
      });

      return updatedState;

    case DELETE_CARD:
      const { cardUid: deletedCardUid } = payload;

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
      } = payload;

      const addedState = state.map((column) => {
        if (column.name != addingToColumn) {
          return column;
        }

        return {
          name: column.name,
          cards: column.cards.concat(new CardObject(addingUid, null, null, addingContent, [eventLogRecord])),
        };
      });
      return addedState;
    case SET_INITIAL_STATE:
      return payload;
    default:
      return state;
  }
  return state;
};
