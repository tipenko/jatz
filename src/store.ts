import { createStore, combineReducers } from 'redux';
import board from './Board/reducer';

const rootReducer = combineReducers({
  board
})

const store = createStore(rootReducer);

export default store;
