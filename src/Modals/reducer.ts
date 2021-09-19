import {
  ADD_CARD,
  FINISH_ADD_CARD,
  CANCEL_ADD_CARD,
} from '../Board/actionTypes';

import {
  FINISH_ADD_LOG_RECORD,
  CANCEL_ADD_LOG_RECORD,
  INITIATE_ADD_LOG_RECORD
} from './actionCreators';

const STATE_ADDING = 'ADDING_CARD';

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

    case CANCEL_ADD_LOG_RECORD:
    case FINISH_ADD_LOG_RECORD:
      return {
        ...state,
        addingLogRecord: false
      }

    case INITIATE_ADD_LOG_RECORD:
      return {
        ...state,
        addingLogRecord: true
      }
    default:
      return initialState;
  }
};
