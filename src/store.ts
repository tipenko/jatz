import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import board from './Board/reducer';
import timeMiddleware from './Board/middlewares';
import modals from './Modals/reducer';

const rootReducer = combineReducers({
  board,
  modals,
});

const store = createStore(rootReducer, applyMiddleware(thunk, timeMiddleware));

export default store;
