import { createStore, combineReducers } from 'redux';
import board from './Board/reducer';
import modals from './Modals/reducer';
import xml2js from 'xml2js';
import fs from 'fs';
import map from 'lodash/map';
import CardObject from "./types/CardObject";
import {setInitialState} from "./Board/actionCreators";

const rootReducer = combineReducers({
  board,
  modals
});

const store = createStore(rootReducer);

/*const one = new CardObject(1, 'one');
const two = new CardObject(2, 'two');
const three = new CardObject(3, 'three');
const four = new CardObject(4, 'four');
const five = new CardObject(5, 'five');
const six = new CardObject(6, 'six');
const seven = new CardObject(7, 'seven');
const eight = new CardObject(8, 'eight');

const initialState = [
  { name: 'todo', cards: [one, two] },
  { name: 'blocked', cards: [three, four] },
  { name: 'in progress', cards: [five, six] },
  { name: 'done', cards: [seven, eight] },
];*/

const parser = new xml2js.Parser();
fs.readFile(__dirname+'/../defaultBoard.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        const columns = result.board.column;
        const initialState = map(columns, column => {
          const name = column["$"]["name"];
          const cardsFromXml = column["card"];
          const cards = map(cardsFromXml, cardItem => {
            const uid = cardItem["$"]["uid"];
            const textContent = cardItem["_"];
            return new CardObject(uid, textContent);
          });

          return {
            name,
            cards
          }

        });
        store.dispatch(setInitialState(initialState));

    });
});


export default store;
