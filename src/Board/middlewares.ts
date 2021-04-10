import { MOVE_CARD, UPDATE_CARD, FINISH_ADD_CARD } from './actionTypes';
import LogEvent from '../types/LogEvent';

const getCurrentTime = () => new Date().getTime();

const wrapNext = (next, action, time) => (...eventLogExtras) => {
  next({
    ...action,
    eventLogRecord: new LogEvent(time, action.type, eventLogExtras),
  });
};

const timeMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  const { type } = action;

  const wrappedNext = wrapNext(next, action, getCurrentTime());
  switch (type) {
    case MOVE_CARD:
      const {
        payload: { source, target, index },
      } = action;
      return wrappedNext(source, target, index);
    case UPDATE_CARD:
      return wrappedNext(action.payload.nextContent);
    case FINISH_ADD_CARD:
      return wrappedNext();
    default:
      return next(action);
  }
};

export default timeMiddleware;
