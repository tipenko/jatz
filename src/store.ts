import { createStore, combineReducers } from 'redux';
import board from './Board/reducer';
import modals from './Modals/reducer';

const rootReducer = combineReducers({
  board,
  modals,
});

const store = createStore(rootReducer);

export default store;
