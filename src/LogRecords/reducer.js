import {
  FINISH_ADD_LOG_RECORD,
  CANCEL_ADD_LOG_RECORD,
  INITIATE_ADD_LOG_RECORD,
} from '../Modals/actionCreators';

const initialState = [];

export default (state, action) => {
  switch (action.type) {
    case FINISH_ADD_LOG_RECORD:
      return [...state, { text: action.payload, time: action.time }];
    default:
      return state || initialState;
  }
};
