export const FINISH_ADD_LOG_RECORD = "finishAddLogRecord";
export const CANCEL_ADD_LOG_RECORD = "cancelAddLogRecord";
export const INITIATE_ADD_LOG_RECORD = "initiateAddLogRecord";

const _r = (type, fn = (i) => i) => (...args) => ({
  type,
  payload: fn(...args),
});

export const initAddLogRecord = _r(INITIATE_ADD_LOG_RECORD);
export const cancelAddLogRecord = _r(CANCEL_ADD_LOG_RECORD);
export const finishAddLogRecord = _r(FINISH_ADD_LOG_RECORD);
