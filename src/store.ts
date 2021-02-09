import { createStore, combineReducers } from 'redux';
import boardReducer from './Board/reducer';

const rootReducer = combineReducers({
  board: boardReducer
})

const store = createStore(rootReducer);

export default store;
