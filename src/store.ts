import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import board from './Board/reducer';
import modals from './Modals/reducer';

const rootReducer = combineReducers({
  board,
  modals,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
