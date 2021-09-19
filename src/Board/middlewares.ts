import { MOVE_CARD, UPDATE_CARD, FINISH_ADD_CARD } from './actionTypes';
import { FINISH_ADD_LOG_RECORD } from '../Modals/actionCreators';
import LogEvent from '../types/LogEvent';
import find from 'lodash/find';
import map from 'lodash/map';
import prop from 'lodash/property';

const getCurrentTime = () => new Date().getTime();

const wrapNext = (next, action, time) => (...eventLogExtras) => {
  next({
    ...action,
    eventLogRecord: new LogEvent(time, action.type, eventLogExtras),
  });
};

const timeMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  const { type } = action;
  const time = getCurrentTime();
  const wrappedNext = wrapNext(next, action, time);
  switch (type) {
    case MOVE_CARD:
      const {
        payload: { source, target, index },
      } = action;
      return wrappedNext(source, target, index);
    case UPDATE_CARD:
      return wrappedNext(action.payload.nextContent);
    case FINISH_ADD_CARD:
      return wrappedNext(action.payload.columnName);
    case FINISH_ADD_LOG_RECORD:
      const board = getState().board;
      const inProgressColumn = find(board, { name: 'in progress' });
      const { cards } = inProgressColumn;
      const uids = map(cards, prop("uid"));
      return next({
        ...action,
        time,
        uids
      });
    default:
      return next(action);
  }
};

export default timeMiddleware;
