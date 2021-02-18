import {
  ADD_CARD,
  FINISH_ADD_CARD,
  CANCEL_ADD_CARD,
} from '../Board/actionTypes';

const STATE_ADDING = 'ADDING_CARD';
const STATE_IDLE = 'STATE_IDLE';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CARD:
      return {
        ...state,
        addingCard: {
          state: STATE_ADDING,
          addingToColumn: action.payload.columnName,
        },
      };
    case FINISH_ADD_CARD:
    case CANCEL_ADD_CARD:
      return { ...state, addingCard: {} };
    default:
      return initialState;
  }
};
